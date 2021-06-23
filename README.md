# AWT BioNWeb Project
###AHmad Repo

Advanced Web Technologies SS21 group project backend for group BioNWeb.

# 💎 WHAT IT IS

A web service that allows university students to find study pals based on courses, interests, knowledge, speciality, etc. You can create and customize a profile that includes all your preferences and information for matching with other students.

# 🔨 HOW IT WORKS

A full stack application based on the [MERN Stack](https://www.mongodb.com/mern-stack). It uses [MongoDB](https://www.mongodb.com/) as a database, [ExpressJS](https://expressjs.com/) as a backend web framework running on a [NodeJS](https://nodejs.org/en/) server and [React](https://reactjs.org/) for the frontend.

## Architecture

The system is based on [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/). Each part of the system runs in a Docker container. Using a docker-compose.yaml file, the structure and configuration of each of the running docker containers is defined. The system is deployed on a [Ubuntu](https://ubuntu.com/) server that has Docker and docker-compose isntalled on it.

Every request to the server gets routed through [Nginx](https://www.nginx.com/), which is setup as a reverse proxy. It forwards each request to the corresponding docker container and is the only container that is exposed to the internet through port 80 and 443. It also handles all the [SSL](https://en.wikipedia.org/wiki/SSL) validation and forces the use of https when communicating with the server.

Another container is running certbot which continously checks the validity of the SSL certificates and automatically renews them if necessary. More information can be found in the [📓 INFORMATION](#ssl) section.

## Routes/Routing

Nginx is configured to forward each request based on the URL.

- `/api/` Gets forwarded to the backend NodeJS server.
- `/` Gets forwarded directly to the React frontend.

# ⚡ HOW TO GET STARTED CODING

1. Install Docker on your machine.
2. Fork and clone the repository https://github.com/SteveMelons/awt-bionweb-project.

   If you have never contributed to a project before or just need to refresh your memory, check out https://github.com/firstcontributions/first-contributions.

3. After you have forked and cloned the repo, launch the docker containers using docker-compose.
   ```
   docker-compose up -d
   ```
4. Open your browser to https://localhost.
5. Now you can create a new branch, start coding, commit your work and then finally make a pull request from your forked repo.

   Again, if you need some help check out https://github.com/firstcontributions/first-contributions.

Happy Coding! 🏆

# ✨TIPS AND TRICKS

## Useful Commands

- Check all running docker containers.

  ```
  docker ps
  ```

- Follow logs of a container.

  ```
  docker logs --follow <CONTAINER ID>
  ```

  For example with the **node-backend** and **node-frontend** container.

# 📓 INFORMATION

## SSL

The project is setup to use SSL encryption using https.

Certificates for [awt-bionweb.ddns.net](https://awt-bionweb.ddns.net/) have been issued by [Let's Encypt](https://letsencrypt.org/) and are auto-renewed using [certbot](https://certbot.eff.org/).
