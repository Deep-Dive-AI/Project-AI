# Project-AI

```
docker stop deep_dive_database_container

docker rm deep_dive_database_container
```
```
docker stop deep_dive_api_container

docker rm deep_dive_api_container
```
```
docker run -p 3306:3306 --name deep_dive_database_container tiesnoordhuis/deep_dive_database

docker run -p 8000:8000 --link deep_dive_database_container:db --name deep_dive_api_container tiesnoordhuis/deep_dive_api
```

```
node server.js
^
|
voor werkende login page met datadase
```