# Setup of the Server

## Steps to follow 

### Firewall

```
ufw default deny incoming
ufw allow 22/tcp
ufw enable
ufw status
```

### Deployment of containers for services:

Use the `compose.yaml` with docker-compose in the root of the repository.

Example usage:
```
docker compose up -d
```
This starts all the containers in the background.

#### Further information on nginx:

https://github.com/nginx-proxy/acme-companion
