const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const redis = require("redis");
const { promisify } = require("util");
const routes = require("./routes");

//load env variables
dotenv.config();

//start express
const app = express();
app.use(express.json());

//set up CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
};
app.use(cors(corsOptions));

//set up redis
const redisClient = redis.createClient({ host: "redis" });
redisClient.on("error", function (e) {
  console.error("Cannot connect to redis", e);
  process.exit(1);
});
const redisGetAsync = promisify(redisClient.get).bind(redisClient);

//load routes
routes(app, { redisClient, redisGetAsync });

const port = process.env.PORT | 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
