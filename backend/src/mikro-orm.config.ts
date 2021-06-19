import { MikroORM } from "@mikro-orm/core";
import { DB_NAME, __prod__ } from "./constants";
import { User } from "./entities/User";

export default {
  entities: [User],
  dbName: DB_NAME,
  type: "mongo",
  clientUrl: "mongodb://mongo:27017",
  debug: !__prod__,
  ensureIndexes: true,
} as Parameters<typeof MikroORM.init>[0];
