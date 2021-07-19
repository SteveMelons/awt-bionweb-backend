import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import argon2 from "argon2";
import express from "express";
import { SESSION_COOKIE_NAME } from "./constants";
import { Course } from "./entities/Course";
import { Language } from "./entities/Language";
import { Message } from "./entities/Message";
import { Preference } from "./entities/Preference";
import { StudyProgram } from "./entities/StudyProgram";
import { University } from "./entities/University";
import { User } from "./entities/User";
import { UpdateUserArgs } from "./types/args";
import { IdFieldResponse, IdResponse } from "./types/responses";
import { BasicEntity, FiltersInterface } from "./types/types";
import { filterUser, filterUserFavorite } from "./utils/filterEntity";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "./validation";

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
    const name: string = req.body.name;
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;

    // input validation
    let err = await validateName(name);
    if (err) response.errors.push(err);
    err = await validateUsername(username);
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
      name,
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
            msg: "User not found",
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
            msg: "Invalid password",
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

  router.post("/users", async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    const filters = req.body.filters as FiltersInterface | undefined;

    const newFilters: any = {};
    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        const element = (filters as any)[key] as BasicEntity[];
        if (element.length !== 0) newFilters[key] = element.map((el) => el.id);
      }
    }

    const users = await em.find(
      User,
      { $and: [newFilters, { id: { $ne: req.session.userId } }] },
      {
        limit,
        populate: [
          "university",
          "studyprogram",
          "preferences",
          "skills",
          "languages",
          "courses",
          "seen",
          "favorites",
        ],
        offset,
        orderBy: { createdAt: -1 },
      }
    );

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
    let userInput: UpdateUserArgs = {
      avatar: req.body.avatar,
      skills: req.body.skills,
      studyprogram: req.body.studyprogram,
      mobile: req.body.mobile,
      preferences: req.body.preferences,
      bio: req.body.bio,
      languages: req.body.languages,
      courses: req.body.courses,
      university: req.body.university,
    };

    if (userInput.skills) {
      await user.skills.init();
      let skills: Preference[] = [];
      userInput.skills.forEach((el) => {
        skills.push(em.getReference(Preference, el.id));
      });
      user.skills.set(skills);
    }

    if (userInput.studyprogram && userInput.studyprogram.id !== "") {
      user.studyprogram = em.getReference(
        StudyProgram,
        userInput.studyprogram.id
      );
    }

    if (userInput.mobile) {
      user.mobile = userInput.mobile;
    }

    if (userInput.preferences) {
      await user.preferences.init();
      let preferences: Preference[] = [];
      userInput.preferences.forEach((el) => {
        preferences.push(em.getReference(Preference, el.id));
      });
      user.preferences.set(preferences);
    }

    if (userInput.bio) {
      user.bio = userInput.bio;
    }

    if (userInput.languages) {
      await user.languages.init();
      let languages: Language[] = [];
      userInput.languages.forEach((el) => {
        languages.push(em.getReference(Language, el.id));
      });
      user.languages.set(languages);
    }

    if (userInput.courses) {
      await user.courses.init();
      let courses: Course[] = [];
      userInput.courses.forEach((el) => {
        courses.push(em.getReference(Course, el.id));
      });
      user.courses.set(courses);
    }

    if (userInput.university && userInput.university.id !== "") {
      user.university = em.getReference(University, userInput.university.id);
    }

    if (userInput.avatar) {
      user.avatar = userInput.avatar;
    }

    // update database
    em.persistAndFlush(user);

    return res.send(true);
  });

  router.get("/user/delete", async (req, res) => {
    let user = await em.findOne(User, { id: req.session.userId });

    if (!user) {
      return res.send(false);
    }

    em.remove(user).flush();
    return res.send(true);
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

  router.get("/user/seen", async (req, res) => {
    const userId = req.session.userId;

    let user = await em.findOne(User, { id: userId });

    if (!user) {
      return res.send();
    }

    // filter user
    await user.seen.init();

    let response = [];
    for (let obj of user.seen) {
      response.push(filterUserFavorite(obj));
    }

    return res.send(response);
  });

  router.get("/user/:id", async (req, res) => {
    const requiredId = req.params.id;
    const userId = req.session.userId;

    const requiredUser = await em.findOne(User, { id: requiredId });
    const user = await em.findOne(User, { id: userId });

    if (!user || !requiredUser || requiredId == userId) {
      return res.send();
    }

    // filter user
    const response = filterUser(requiredUser);

    // update seen users
    user.seen.add(requiredUser);
    em.persistAndFlush(user);

    return res.send(response);
  });

  router.get("/recommendations", async (req, res) => {
    // TODO: implement better recommendation algorithm
    const length = 10;
    let response: User[] = []; 
    const self = await em.findOne(User, { id: req.session.userId });
    const preferenceIds: string[] = [];
    if (self?.preferences) {
      self!.preferences.init();
      for (const el in self!.preferences) {
        if (Object.prototype.hasOwnProperty.call(self!.preferences, el)) {
          const element = self!.preferences[el];
          preferenceIds.push(element.id);
        }
      }
    }
    const usersSkills = await em.find(
      User,
      { skills: preferenceIds },
      {
        orderBy: { createdAt: -1 },
        populate: [
          "university",
          "studyprogram",
          "preferences",
          "skills",
          "languages",
          "courses",
          "seen",
          "favorites",
        ],
      }
    );
    if (usersSkills.length < length) {
      const usersSkillsIds = usersSkills.map((el) => el.id);
      const usersAll = await em.find(
        User,
        { id: { $nin: usersSkillsIds } },
        {
          orderBy: { createdAt: -1 },
          populate: [
            "university",
            "studyprogram",
            "preferences",
            "skills",
            "languages",
            "courses",
            "seen",
            "favorites",
          ],
        }
      );
      usersSkills.push(...usersAll.slice(0, length - usersSkills.length));
      response = usersSkills.filter(obj => obj != self);
    }
    res.send(response);
  });

  router.get("/favorites", async (req, res) => {
    let userId = req.session.userId;
    let user = await em.findOne(User, { id: userId }, ["favorites"]);
    let response = [];
    if (!user) {
      return res.send(false);
    }

    //filter favotites
    for (let fav of user.favorites) {
      response.push(fav);
    }

    response = response.map((fav) => filterUserFavorite(fav));

    return res.send(response);
  });

  router.post("/favorites/add", async (req, res) => {
    let favoriteId = req.body.favoriteId;
    let userId = req.session.userId;

    let favorite = await em.findOne(User, { id: favoriteId });
    let user = await em.findOne(User, { id: userId });

    if (!user || !favorite) {
      return res.send(false);
    }

    user.favorites.add(favorite);
    em.persistAndFlush(user);
    return res.send(true);
  });

  router.delete("/favorites/remove/:id", async (req, res) => {
    let favoriteId = req.params.id;
    let userId = req.session.userId;

    let favorite = await em.findOne(User, { id: favoriteId });
    let user = await em.findOne(User, { id: userId });

    if (!user || !favorite) {
      return res.send(false);
    }

    user.favorites.remove(favorite);
    em.persistAndFlush(user);
    return res.send(true);
  });

  router.get("/courses", async (_req, res) => {
    const courses = await em.find(Course, {});
    return res.send(courses);
  });

  router.get("/languages", async (_req, res) => {
    const courses = await em.find(Language, {});
    return res.send(courses);
  });

  router.get("/preferences", async (_req, res) => {
    const courses = await em.find(Preference, {});
    return res.send(courses);
  });

  router.get("/studyprograms", async (_req, res) => {
    const courses = await em.find(StudyProgram, {});
    return res.send(courses);
  });

  router.get("/universities", async (_req, res) => {
    const courses = await em.find(University, {});
    return res.send(courses);
  });

  router.get("/filters", async (_req, res) => {
    const response: any = {};
    response.courses = await em.find(Course, {});
    response.languages = await em.find(Language, {});
    response.preferences = await em.find(Preference, {});
    response.studyprogram = await em.find(StudyProgram, {});
    response.university = await em.find(University, {});
    return res.send(response);
  });

  router.get("/messages", async (req, res) => {
    const profileId = req.query.profileId;

    const messages = await em.find(
      Message,
      {
        $or: [
          {
            $and: [{ from: profileId }, { to: req.session.userId }],
          },
          {
            $and: [{ to: profileId }, { from: req.session.userId }],
          },
        ],
      },
      ["from", "to"],
      { createdAt: -1 }
    );

    res.send(messages);
  });

  return router;
};
