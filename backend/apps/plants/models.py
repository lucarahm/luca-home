from datetime import datetime, timezone
import uuid

from pydantic import BaseModel, Field


def datetime_now() -> datetime:
    return datetime.now(timezone.utc)


class SensorData(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    metadata: dict
    temp: float
    air_humidity: int
    soil_moisture: int
    timestamp: datetime

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "16fd2706-8baf-433b-82eb-8c7fada847da",
                "metadata": {
                    "location": "Innsbruck",
                    "device": "RaspberryPi_4B",
                },
                "temp": 23.5,
                "air_humidity": 55,
                "soil_moisture": 78,
                "timestamp": "2023-10-30T00:56:45.610+00:00",
            }
        }
