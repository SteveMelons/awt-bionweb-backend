# AWT BioNWeb Project

Advanced Web Technologies SS21 group project backend for group BioNWeb.

# 💎 WHAT IT IS

...

# 🔨 HOW IT WORKS

## Architecture

...

# ⚡ HOW TO GET STARTED CODING

1. Install Docker on your machine
2. Clone the repo using SSH

   ```
   git clone git@github.com:SteveMelons/awt-bionweb-project.git
   ```

   or using HTTPS if you don't have SSH configured on your machine

   ```
   git clone https://github.com/SteveMelons/awt-bionweb-project.git
   ```

3. Launch the docker containers using docker-compose
   ```
   docker-compose up -d
   ```
4. Open your browser to localhost

Happy Coding! 🏆

# ✨TIPS AND TRICKS

## Useful Commands

- Check all running docker containers

  ```
  docker ps
  ```

- Follow logs of a container

  ```
  docker logs --follow <CONTAINER ID>
  ```

  For example with the **node-backend** and **node-frontend** container

# 📓 INFO

## SSL

The project is setup to use SSL encryption using https.

Certificates for [awt-bionweb.ddns.net](https://awt-bionweb.ddns.net/) have been issued by [Let's Encypt](https://letsencrypt.org/) and are auto-renewed using [certbot](https://certbot.eff.org/).
