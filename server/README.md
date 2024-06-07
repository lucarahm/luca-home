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

https://github.com/nginx-proxy/acme-companion
