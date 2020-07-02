# Docker

## Setup with Docker

Run the following commands to get up and running if you have Docker and Docker Compose installed.

`docker-compose run -e "SHELL=/bin/bash" --rm --service-ports node`

Your CLI will then be in the container and your prompt should change to something like `node@asdf123:~/app$`

You can then run these commands from inside the container

`npm install`

`npm run watch`