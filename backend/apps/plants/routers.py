from fastapi import APIRouter, Body, HTTPException, Request, status
from fastapi.responses import JSONResponse
from .models import SensorData
from fastapi.encoders import jsonable_encoder

router = APIRouter()


@router.get("/", response_description="List all sensor values")
async def list_sensor_values(request: Request):
    values = []
    for doc in await request.app.collection.find({}).to_list(length=100):
        values.append(doc)
    return values


@router.get("/recent", response_description="Get the most recent sensor values")
async def get_recent(request: Request):
    most_recent = await request.app.collection.find_one(sort=[("timestamp", -1)])
    return most_recent


@router.delete("/{id}", response_description="Delete Entry")
async def delete_entry(id: str, request: Request):
    delete_result = await request.app.collection.delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=404, detail=f"Entry {id} not found")


@router.delete("/many", response_description="Delete Many")
async def delete_entry(request: Request):
    delete_result = await request.app.collection.delete_many({})
    if delete_result.deleted_count != 0:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/command/{cmd}", response_description="Send command to command topic")
async def send_command(cmd: str, request: Request):
    request.app.mqtt.publish("topic/command", cmd)
    return {"result": True, "message": "Published"}
