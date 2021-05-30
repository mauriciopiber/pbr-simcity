Create Web Image

```
docker build -f packages/web/Dockerfile -t 'registry.piber.network/pbr-simcity-web:v1.0.2'  --network="host" .
```

Create API Image
```
docker build -f packages/api/Dockerfile -t 'registry.piber.network/pbr-simcity-api:v1.0.2' .
```
