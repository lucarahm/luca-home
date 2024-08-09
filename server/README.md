# Setup of the Server

---------------------------------------------

## Firewall

---------------------------------------------

This is just a very minimal ufw setup to have all other ports than `ssh` closed. Please adjust for your purposes. 

```
ufw default deny incoming
ufw allow 22/tcp
ufw enable
ufw status
```

## Deployment of containers for services:

---------------------------------------------

### 1. Docker Network

Create a custom docker network to have all the necessary services encapsulated, but able to communicate:

```shell
docker network create my-network
```

### 2. Postgres DB:

To deploy the postgres database use the docker compose file from the `/database` subdirectory. It is **important**
to have the postgres container in the same docker network as the frontend.

After that apply the prisma migrations from the `/svelte-frontend` directory to initialize the database:
```shell
npx prisma migrate deploy
npx prisma db seed
```

### 3. Run the reverse proxy, cert bot and frontend

*Make sure the Dockerimage of the svelte-frontend is already build and available from the local repository. Altenatively
change the compose file to build from the directory, this may take some time on weak servers.*

Use the `compose.yaml` with docker-compose in the root of the repository.

Example usage:

```shell
docker compose up -d
```

This starts all the containers in the background.

#### Further information on nginx:

https://github.com/nginx-proxy/acme-companion
