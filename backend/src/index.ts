import "dotenv-safe/config"; //checks if all necessary env variables from .env.example have been provided
import express from "express";
import expressSession from "express-session";
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
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { getEvents } from "./events";
import { IOSession } from "./types/session";

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
  const RedisStore = connectRedis(expressSession);
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

  // set up express and socket.io
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: { origin: process.env.CORS_ORIGIN, credentials: true },
  });

  /* --- MIDDLEWARE --- */

  // cors
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  // set up express-session
  const session = expressSession({
    name: SESSION_COOKIE_NAME,
    store: new RedisStore({ client: redis, disableTouch: true }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      httpOnly: true,
      secure: __prod__,
      sameSite: "lax",
    },
  });
  app.use(session);

  io.use((socket, next) => {
    session(socket.request as any, {} as any, next as any);
  });

  // body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /* --- ROUTERS --- */

  app.use("/", getRouter(em));

  /* --- SOCKET.IO --- */
  io.on("connection", (socket: Socket) => {
    const session = (socket.request as any as IOSession).session;

    console.log(
      `Client connected IP=${socket.handshake.address} SocketIO_ID=${socket.id} Session_ID=${session.userId}`
    );
    console.log(
      `${socket.client.conn.server.clientsCount} client connections open`
    );

    socket.on("disconnect", () => {
      console.log(
        `Client disconnected IP=${socket.handshake.address} SocketIO_ID=${socket.id} Session_ID=${session.userId}`
      );
      console.log(
        `${socket.client.conn.server.clientsCount} client connections open`
      );
      socket.broadcast.emit("user disconnected", {
        socketId: socket.id,
        userId: session.userId,
      });
    });

    const users = [];
    for (let [id, userSocket] of io.of("/").sockets) {
      users.push({
        socketId: id,
        userId: (userSocket.request as any as IOSession).session.userId,
      });
    }

    socket.emit("users", users);
    socket.broadcast.emit("user connected", {
      socketId: socket.id,
      userId: session.userId,
    });

    // events
    getEvents(socket, em);
  });

  /* --- START LISTENING --- */

  server.listen(process.env.PORT, () => {
    console.info("server started listening on port " + process.env.PORT);
  });
})();
