import "dotenv-safe/config"; //checks if all necessary env variables from .env.example have been provided
import express from "express";

const main = async () => {
  /* --- CONFIGURATION --- */
  const app = express();

  /* --- ROUTES --- */
  app.get("/", (req, res) => {
    res.send("Hello World!!");
  });

  /* --- START LISTENING --- */
  app.listen(process.env.PORT, () => {
    console.log("server started listening on port " + process.env.PORT);
  });
};

main();
