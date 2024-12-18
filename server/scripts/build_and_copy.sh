#!/usr/bin/env bash

cd ../svelte-frontend || exit

docker build -t svelte-frontend:latest . && echo "Successfully build the new image"
docker save -o frontend-docker.tar svelte-frontend:latest && echo "Docker image saved"
scp -i /home/luca/.ssh/luca_home ./frontend-docker.tar luca-home:/home/ubuntu/web_v1