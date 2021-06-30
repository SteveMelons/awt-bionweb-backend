import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import express from "express";
import { SESSION_COOKIE_NAME } from "./constants";
import { User } from "./entities/User";
import argon2 from "argon2";
import { IdFieldResponse, IdResponse } from "./types/responses";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "./validation";
import { filterUser } from "./utils/filterEntity";

export const getRouter = (
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
) => {
  var router = express.Router();

  /* ROUTES */

  router.get("/me", (req, res) => {
    let response: IdResponse = {};

    if (req.session.userId) {
      response.id = req.session.userId;
    }

    res.send(response);
  });

  router.post("/register", async (req, res) => {
    // setup response object
    let response: IdFieldResponse = { errors: [] };

    // get form values
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;

    // input validation
    let err = await validateUsername(username);
    if (err) response.errors.push(err);
    err = await validateEmail(email);
    if (err) response.errors.push(err);
    err = await validatePassword(password);
    if (err) response.errors.push(err);

    // if there are validation errors send response
    if (response.errors.length > 0) return res.send(response);

    // hash password
    const hashedPassword = await argon2.hash(password);

    // create user object
    const user = em.create(User, {
      username,
      email,
      password: hashedPassword,
    });

    // try to add user
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === 11000) {
        response.errors.push({
          field: Object.entries(err.keyValue)[0][0],
          msg: "Already taken",
        });
        return res.send(response);
      }
    }

    response.id = user.id;

    // login
    req.session.userId = user.id;

    return res.send(response);
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

    // em.populate(user, "password");

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

    // filter users
    const response = users.map((user) => filterUser(user));

    return res.send(response);
  });

  router.post("/user/update", async (req, res) => {
    // get currently logged in user's id
    const id = req.session.userId;

    // find user
    const user = await em.findOne(User, { id });

    // check if user exists
    if (!user) {
      return res.send(false);
    }

    // get data from body
    const skills = req.body.skills;
    const studyProgram = req.body.studyProgram;

    // update user
    user.skills = skills;
    user.studyProgram = studyProgram;

    // update database
    em.persistAndFlush(user);

    return res.send(true);
  });

  router.get("/user/delete", (req, res) => {
    res.send("delete student");
  });

  router.get("/user", async (req, res) => {
    const id = req.session.userId;

    if (!id) {
      return res.send();
    }

    const user = await em.findOne(User, { id });

    if (!user) {
      return res.send();
    }

    // filter user
    const response = filterUser(user);

    return res.send(response);
  });

  router.get("/user/:id", async (req, res) => {
    const id = req.params.id;

    const user = await em.findOne(User, { id });

    if (!user) {
      return res.send();
    }

    // filter user
    const response = filterUser(user);

    return res.send(response);
  });

  router.get("/students/matches", (req, res) => {
    res.send("matches");
  });

  router.get("/students/:filters", (req, res) => {
    //TODO to specify which filters do we need
    res.send("filterd students");
  });

  router.get("/favorites", (req, res) => {
    res.send("favorite");
  });

  router.get("/favorites/add", (req, res) => {
    res.send("add favorite");
  });

  router.get("/favorites/remove/:id", (req, res) => {
    res.send(`favorite with id ${req.params.id} will be removed`);
  });

  return router;
};
