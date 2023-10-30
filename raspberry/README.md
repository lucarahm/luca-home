# Raspberry

This is the directory for the raspberry pi 4 code. To install all the drivers for the LCD Display follow the
installation guide down below!  
**For further information check out my fork of the *lcd* repository here: [py-lcd](https://github.com/lucarahm/py-lcd)**

# Table of Contents

1. [Installation](#Installation)
2. [Implementation](#Implementation)
    - [Systemd](#systemd)

# ~~Installation~~ (Deprecated)

- Install git
  ```
  sudo apt install git
  ```

- Make sure you are inside the `raspberry/` directory
  ```
  cd raspberry/
  ```

- Run the automatic installation script with `sudo` permission
  ```
  sudo ./install.sh
  ```

- During the installation, pay attention to any messages about `python` and `python3` usage, as they inform which
  version you should use to interface with the LCD driver. For example:
  ```
  [LCD] [INFO] You may use either 'python' or 'python3' to interface with the lcd.
  ```
  or alternatively,
  ```
  [LCD] [INFO] Use 'python3' to interface with the lcd.
  ```

- At the end of the installation script, you'll be prompted to reboot the RPi to apply the changes made
  to `/boot/config.txt` and `/etc/modules`.

- After rebooting, try one of the [**demos**](#demos):
  ```
  ./home/${USER}/lcd/demo_clock.py
  ```
  or
  ```
  python /home/${USER}/lcd/demo_clock.py
  ```
  or
  ```
  python3 /home/${USER}/lcd/demo_clock.py
  ```

# Implementation

Once you are done editing a `demo_*.py` file or writing your own Python script, follow the instructions on this section
to run the script in the background. First, however, ensure that the script (e.g., `script.py`) has at least permission
to be executed, as follows:

```sh
sudo chmod +x script.py
```

Similarly, file ownership can be configured via `chown`. For example, to set the user `${USER}` as owner of the
file `script.py`, run the following:

```sh
sudo chown ${USER} script.py
```

## Systemd

Use the following procedure to run any LCD Python script as a (systemd) service:

1. Create a new unit file in `/lib/systemd/system/` called `rpi-lcd.service`:
   ```sh
   sudo nano /lib/systemd/system/rpi-lcd.service
   ```

2. Copy and paste the following in the new unit file:

   (*If your user is different than `pi`, remember to edit the `User=` entry.*)

   ```sh
   [Unit]
   Description=RPi Python script for a 16x2 LCD

   [Service]
   Type=simple
   ## Edit the following according to the script permissions
   User=pi
   #Group=users

   ## Edit the following with the full path to the compatible Python version and your script
   ExecStart=/usr/bin/python /path/to/script.py

   Restart=always
   RestartSec=5

   KillMode=process
   KillSignal=SIGINT

   [Install]
   WantedBy=multi-user.target
   ```

3. Enable the service and start it:
   ```sh
   sudo systemctl enable rpi-lcd.service
   sudo systemctl start rpi-lcd.service
   ```

4. Check that the LCD is displaying the correct information; otherwise, check the service status:
   ```sh
   systemctl status rpi-lcd.service
   ```
