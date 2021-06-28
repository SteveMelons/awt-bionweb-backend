import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import express from "express";
import { SESSION_COOKIE_NAME } from "./constants";
import { User } from "./entities/User";
import argon2 from "argon2";

export const getRouter = (
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
) => {
  var router = express.Router();

  /* ROUTES */

  router.get("/", (req, res) => {
    return res.send("Hello World from Express and Node!");
    // return res.send("UserId: " + req.session.userId);
  });

  router.get("/me", (req, res) => {
    if (req.session.userId) {
      res.send({ id: req.session.userId });
    } else {
      res.send();
    }
  });

  router.post("/register", async (req, res) => {
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
        return res.send({
          errors: [
            {
              field: Object.entries(err.keyValue)[0][0],
              msg: "already taken",
            },
          ],
        });
      }
    }

    req.session.userId = user.id;

    return res.send(user);
  });

  router.post("/login", async (req, res) => {
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
      return res.send({
        errors: [
          {
            field: "usernameOrEmail",
            msg: "user not found",
          },
        ],
      });
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      // passwor incorrect
      return res.send({
        errors: [
          {
            field: "password",
            msg: "invalid password",
          },
        ],
      });
    }

    req.session.userId = user.id;

    return res.send({ id: user.id });
  });

  router.post("/logout", async (req, res) => {
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

  router.get("/users", async (_req, res) => {
    const users = await em.find(User, {});

    return res.send(users);
  });

  router.get("/user/update", (req, res, next) => {
    res.send("update student");
  });

  router.get("/user/delete", (req, res, next) => {
    res.send("delete student");
  });

  router.get("/user/profile/:id", (req, res, next) => {
    res.send(`profile of student with id ${req.params.id}`);
  });

  router.get("/students/matches", (req, res, next) => {
    res.send("matches");
  });

  router.get("/students/:filters", (req, res, next) => {
    //TODO to specify which filters do we need
    res.send("filterd students");
  });

  router.get("/favorites", (req, res, next) => {
    res.send("favorite");
  });

  router.get("/favorites/add", (req, res, next) => {
    res.send("add favorite");
  });

  router.get("/favorites/remove/:id", (req, res, next) => {
    res.send(`favorite with id ${req.params.id} will be removed`);
  });

  return router;
};
