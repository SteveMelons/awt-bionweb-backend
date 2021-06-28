import "dotenv-safe/config"; //checks if all necessary env variables from .env.example have been provided
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import cors from "cors";
import { SESSION_COOKIE_NAME, __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  MikroORM,
} from "@mikro-orm/core";
import { getRouter } from "./router";

(async () => {
  /* --- CONFIGURATION --- */

  // setup mongodb with mikroorm
  let em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  try {
    em = (await MikroORM.init(microConfig)).em;
    console.info("successfully conencted to mongodb database");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  // set up redis
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  await new Promise((resolve) => {
    redis.on("connect", () => {
      console.info("successfully conencted to redis store");
      return resolve(true);
    });
    redis.on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
  });

  // set up express
  const app = express();

  /* --- MIDDLEWARE --- */

  // cors
  app.use(
    cors({
      credentials: true,
    })
  );

  // set up express-session
  app.use(
    session({
      name: SESSION_COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
    })
  );

  // body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /* --- ROUTERS --- */

  app.use("/", getRouter(em));

  /* --- START LISTENING --- */

  app.listen(process.env.PORT, () => {
    console.info("server started listening on port " + process.env.PORT);
  });
})();
