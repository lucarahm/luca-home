import drivers
from time import sleep
from datetime import datetime
import adafruit_dht
import board
import adafruit_pcf8591.pcf8591 as PCF
from adafruit_pcf8591.analog_in import AnalogIn
from adafruit_pcf8591.analog_out import AnalogOut

import RPi.GPIO as GPIO

# from picamera import PiCamera

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

    while True:
        try:
            print("Writing to display")

            temp_dht22 = sensor_dht22.temperature
            humidity_dht22 = sensor_dht22.humidity
            moisture_a3 = AnalogIn(pcf, PCF.A3)

            display.lcd_display_string(f"Temp: {temp_dht22}C", 1)  # Write line of text to first line of display
            display.lcd_display_string(f"Humidity: {temp_dht22}%", 2)  # Write line of text to first line of display

            sleep(2)

        except RuntimeError as error:
            # Errors happen fairly often, DHT's are hard to read, just keep going
            print(error.args[0])
            sleep(2.0)
            continue

        except KeyboardInterrupt:
            # If there is a KeyboardInterrupt (when you press ctrl+c), exit the program and cleanup
            print("Cleaning up!")
            display.lcd_clear()
            GPIO.output(PUMPE1, 1)  # turns off the pump

            break
