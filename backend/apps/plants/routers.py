from fastapi import APIRouter, Body, HTTPException, Request, status
from fastapi.responses import JSONResponse
from .models import SensorData
from fastapi.encoders import jsonable_encoder

router = APIRouter()


@router.post("/", response_description="Add new value")
async def create_task(request: Request, sensor_data: SensorData = Body(...)):
    sensor_data = jsonable_encoder(sensor_data)
    new_data = await request.app.mongodb["sensor_data"].insert_one(sensor_data)
    created_task = await request.app.mongodb["sensor_data"].find_one(
        {"_id": new_data.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_task)


@router.get("/", response_description="List all sensor values")
async def list_sensor_values(request: Request):
    values = []
    for doc in await request.app.mongodb["sensor_data"].find().to_list(length=100):
        values.append(doc)
    return values


@router.delete("/{id}", response_description="Delete Entry")
async def delete_entry(id: str, request: Request):
    delete_result = await request.app.mongodb["sensor_data"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=404, detail=f"Entry {id} not found")


@router.get("/command/{cmd}", response_description="Send command to command topic")
async def send_command(cmd: str, request: Request):
    request.app.mqtt.publish("topic/command", cmd)
    return {"result": True, "message": "Published"}
