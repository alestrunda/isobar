const axios = require("axios");
const jwt = require("jsonwebtoken");
const { authenticateJWT } = require("./authenticate");

module.exports = function (app, { redisClient, redisGetAsync }) {
  app.get("/health", (_, response) => {
    response.send("OK");
  });

  app.post("/login", (request, response) => {
    //should query a database in a real-world case and have passwords stored in some encrypted way
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
};
