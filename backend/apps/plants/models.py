import datetime
import uuid

from pydantic import BaseModel, Field


class SensorData(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    temp: float
    air_humidity: int
    soil_moisture: int
    timestamp: datetime.datetime

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "16fd2706-8baf-433b-82eb-8c7fada847da",
                "temp": 23.5,
                "air_humidity": 55,
                "soil_moisture": 78,
                "timestamp": datetime.datetime,
            }
        }


