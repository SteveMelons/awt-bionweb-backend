declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    SESSION_SECRET: string;
    SESSION_COOKIE_NAME: string;
    REDIS_URL: string;
  }
}
