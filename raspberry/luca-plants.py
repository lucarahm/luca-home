import drivers
from time import sleep
from datetime import datetime
import adafruit_dht
import board
import adafruit_pcf8591.pcf8591 as PCF
from adafruit_pcf8591.analog_in import AnalogIn
from adafruit_pcf8591.analog_out import AnalogOut
import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt
import json


PUMPE1 = 17


def activate_pump(pump_pin, secs=2):
    GPIO.output(pump_pin, 0)
    sleep(secs)  # Run the pump for 2 seconds (adjust as needed)
    GPIO.output(pump_pin, 1)


""" To start off the display should show the temperature it reads """

if __name__ == '__main__':
    # Setup
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(PUMPE1, GPIO.OUT)
    # switch off relais to init
    GPIO.output(PUMPE1, 1)

    display = drivers.Lcd()
    sensor_dht22 = adafruit_dht.DHT22(board.D22)
    i2c = board.I2C()
    pcf = PCF.PCF8591(i2c)
    pcf_in_0 = AnalogIn(pcf, PCF.A0)
    pcf_in_3 = AnalogIn(pcf, PCF.A3)

    # MQTT
    MQTT_BROKER_HOST = "130.61.205.59"
    MQTT_USERNAME = "test"
    MQTT_PASSWORD = "3515"

    client = mqtt.Client()
    client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
    client.connect(MQTT_BROKER_HOST, 1883)

    display_is_on = False

    while True:
        try:
            print("Writing to display")

            temp_dht22 = sensor_dht22.temperature
            humidity_dht22 = sensor_dht22.humidity
            moisture_a3 = AnalogIn(pcf, PCF.A3).value

            if display_is_on:
                display.lcd_display_string(f"T: {temp_dht22}C M: {moisture_a3}%", 1)  # Write line of text to first line of display
                display.lcd_display_string(f"Humidity: {humidity_dht22}%", 2)  # Write line of text to first line of display
            else:
                display.lcd_clear()

            # Publish to MQTT Broker
            data = {
                "temp": temp_dht22,
                "air_humidity": humidity_dht22,
                "soil_moisture": moisture_a3,
            }

            client.publish("topic/sensor-data", json.dumps(data))

            sleep(5)

        except RuntimeError as error:
            # Errors happen fairly often, DHT's are hard to read, just keep going
            print(error.args[0])
            sleep(2.0)
            continue

        except KeyboardInterrupt:
            # If there is a KeyboardInterrupt (when you press ctrl+c), exit thlucae program and cleanup
            print("Cleaning up!")
            display.lcd_clear()
            GPIO.output(PUMPE1, 1)  # turns off the pump

            break
