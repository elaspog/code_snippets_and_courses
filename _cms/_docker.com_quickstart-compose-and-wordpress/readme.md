# Quickstart: Compose and WordPress

https://docs.docker.com/compose/wordpress/

**docker-compose.yml**

```
docker-compose up -d
```

in browser:
```
http://localhost:8000
```

```
docker-compose down
# removes the container, default network
# preserves WordPress database

docker-compose down --volumes
# removes the containers, default network, WordPress database
```

**Note (docker-compose.yml):**
* The docker volume `db_data` persists any updates made by WordPress to the database.
* WordPress Multisite works only on ports `80` and `443`
* WordPress Multisite works only on ports `80` and/or `443`. If you get an error message about binding `0.0.0.0` to port `80` or `443` (depending on which one you specified), it is likely that the port you configured for WordPress is already in use by another service.
* The WordPress site is not immediately available on port `8000` because the containers are still being initialized and may take a couple of minutes before the first load
