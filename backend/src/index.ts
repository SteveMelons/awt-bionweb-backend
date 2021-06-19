import "dotenv-safe/config"; //checks if all necessary env variables from .env.example have been provided
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import cors from "cors";
import { SESSION_COOKIE_NAME } from "./constants";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import microConfig from "./mikro-orm.config";
import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  MikroORM,
} from "@mikro-orm/core";
import { User } from "./entities/User";
import argon2 from "argon2";

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
        secure: true,
        sameSite: "lax",
      },
    })
  );

  // swagger ui
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /* --- ROUTES --- */
  app.get("/", (req, res) => {
    return res.send("UserId: " + req.session.userId);
  });

  app.post("/register", async (req, res) => {
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;

    const hashedPassword = await argon2.hash(password);
    const user = em.create(User, {
      username,
      email,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === 11000) {
        return res.send("username or email already taken");
      }
    }

    req.session.userId = user.id;

    return res.send(user);
  });

  app.post("/login", async (req, res) => {
    const usernameOrEmail: string = req.body.usernameOrEmail;
    const password: string = req.body.password;

    // find a user with the username or email
    const user = await em.findOne(
      User,
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    );

    if (!user) {
      // user does not exist
      return res.send("no user matches this username or email");
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      // passwor incorrect
      return res.send("invalid password");
    }

    req.session.userId = user.id;

    return res.send(user);
  });

  app.post("/logout", async (req, res) => {
    await new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(SESSION_COOKIE_NAME);

        if (err) {
          console.error(err);
          return resolve(false);
        }
        resolve(true);
      })
    );

    return res.send(true);
  });

  app.get("/users", async (_req, res) => {
    const users = await em.find(User, {});

    return res.send(users);
  });

  /* --- START LISTENING --- */
  app.listen(process.env.PORT, () => {
    console.info("server started listening on port " + process.env.PORT);
  });
})();
