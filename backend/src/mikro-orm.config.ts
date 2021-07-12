import { Language } from "./entities/Language";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { User } from "./entities/User";
import { Course } from "./entities/Course";
import { Preference } from "./entities/Preference";
import { StudyProgram } from "./entities/StudyProgram";
import { University } from "./entities/University";

export default {
  entities: [User, Preference, University, StudyProgram, Course, Language],
  dbName: process.env.DB_NAME,
  type: "mongo",
  clientUrl: process.env.MONGO_URL,
  debug: !__prod__,
  ensureIndexes: true,
} as Parameters<typeof MikroORM.init>[0];
