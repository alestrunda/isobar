const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const redis = require("redis");
const { promisify } = require("util");
const { authenticateJWT } = require("./authenticate");

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_URL,
};
app.use(cors(corsOptions));

const redisClient = redis.createClient({ host: "redis" });
redisClient.on("error", function (e) {
  console.error("Cannot connect to redis", e);
  process.exit(1);
});
const redisGetAsync = promisify(redisClient.get).bind(redisClient);

app.post("/login", (request, response) => {
  if (request.body.password !== process.env.ACCESS_PASSWORD) {
    response.status(403);
    response.send({ message: "Incorrect password" });
    return;
  }
  const token = jwt.sign({}, process.env.JWT_SECRET);
  response.send({ token });
});

app.get("/", authenticateJWT, async (request, response) => {
  const redisKey = JSON.stringify(request.query);
  const cachedResponse = await redisGetAsync(redisKey);
  if (cachedResponse) {
    response.send(cachedResponse);
    return;
  }

  axios
    .get(process.env.API_URL, {
      params: {
        apikey: process.env.API_KEY,
        ...request.query,
      },
    })
    .then(({ data }) => {
      redisClient.set(redisKey, JSON.stringify(data));
      response.send(data);
    })
    .catch(() => {
      response.status(503);
      response.send({ message: "Service not available" });
    });
});

const port = process.env.PORT | 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
