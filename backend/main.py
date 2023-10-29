import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
from fastapi_mqtt import FastMQTT, MQTTConfig

from apps.plants.routers import router as plants_router

app = FastAPI()

mqtt_config = MQTTConfig(host=settings.MQTT_BROKER_HOST,
                         port=1883,
                         keepalive=60,
                         username=settings.MQTT_USERNAME,
                         password=settings.MQTT_PASSWORD)

app.mqtt = FastMQTT(config=mqtt_config)

app.mqtt.init_app(app)


class SensorData(BaseModel):
    sensor_type: str
    value: float


@app.mqtt.on_connect()
def connect(client, flags, rc, properties):
    app.mqtt.client.subscribe("topic/sensor-data")
    print("Connected: ", client, flags, rc, properties)


@app.mqtt.on_message()
async def message(client, topic, payload, qos, properties):
    print("Received message: ", topic, payload.decode(), qos, properties)


@app.mqtt.on_disconnect()
def disconnect(client, packet, exc=None):
    print("MQTT Client Disconnected!")


@app.mqtt.on_subscribe()
def subscribe(client, mid, qos, properties):
    print("subscribed", client, mid, qos, properties)


@app.on_event("startup")
async def startup():
    app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
    app.mongodb = app.mongodb_client[settings.DB_NAME]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(plants_router, tags=["plants"], prefix="/plants")

if __name__ == '__main__':
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )
