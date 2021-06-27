# Movie search

Simple application to search movies, uses public api [omdbapi](http://www.omdbapi.com/).

Consists of **client** (react.js) and **server** (node.js).

Made as an job interview assignment. Reviewed successfully.

## How to run the app

### Set up envs

There are `.env-sample` files in both *client* and *server*. Create your own `.env` files based on them. You will need to set at least `API_KEY` in *server* and some private `JWT_SECRET` should be set as well.

### Run the app

Both *client* and *server* can be run separately, but since there is also *redis* involved, the best way is to run them all using *Docker* by `docker-compose up`. The app then runs on http://localhost. The API requires authorization, the default password is `test`.
