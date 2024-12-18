#!/usr/bin/env bash

docker load -i ./frontend-docker.tar && echo "Image loaded successfully"

docker compose up -d