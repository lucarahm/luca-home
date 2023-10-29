from pydantic_settings import BaseSettings
from decouple import config


class CommonSettings(BaseSettings):
    APP_NAME: str = "Luca-Home"
    DEBUG_MODE: bool = False


class ServerSettings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000


class DatabaseSettings(BaseSettings):
    DB_URL: str = config('DB_URL')
    DB_NAME: str = config('DB_NAME')


class MQTTSettings(BaseSettings):
    MQTT_BROKER_HOST: str = config('MQTT_BROKER_HOST')
    MQTT_USERNAME: str = config('MQTT_USERNAME')
    MQTT_PASSWORD: str = config('MQTT_PASSWORD')


class Settings(CommonSettings, ServerSettings, DatabaseSettings, MQTTSettings):
    pass


settings = Settings()
