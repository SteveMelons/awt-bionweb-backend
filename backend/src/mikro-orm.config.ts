import { Language } from './entities/language';
import { Course } from './entities/course';
import { StudyProgram } from './entities/studyProgram';
import { University } from './entities/university';
import { Preference } from './entities/preference';
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { User } from "./entities/User";

export default {
  entities: [User, Preference, University, StudyProgram, Course, Language],
  dbName: process.env.DB_NAME,
  type: "mongo",
  clientUrl: process.env.MONGO_URL,
  debug: !__prod__,
  ensureIndexes: true,
} as Parameters<typeof MikroORM.init>[0];
