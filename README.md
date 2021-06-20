# AWT BioNWeb Project

Advanced Web Technologies SS21 group project backend for group BioNWeb.

# 💎 WHAT IT IS

...

# 🔨 HOW IT WORKS

## Architecture

...

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

# 📓 INFO

## SSL

The project is setup to use SSL encryption using https.

Certificates for [awt-bionweb.ddns.net](https://awt-bionweb.ddns.net/) have been issued by [Let's Encypt](https://letsencrypt.org/) and are auto-renewed using [certbot](https://certbot.eff.org/).
