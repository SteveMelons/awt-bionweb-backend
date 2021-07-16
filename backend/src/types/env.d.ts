declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    SESSION_SECRET: string;
    MONGO_URL: string;
    DB_NAME: string;
    REDIS_URL: string;
    CORS_ORIGIN: string;
  }
}
