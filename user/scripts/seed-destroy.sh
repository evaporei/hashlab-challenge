#!/bin/sh

docker-compose run user-migrate-and-seed node_modules/.bin/sequelize db:seed:undo --config src/config/sequelize.js --seeders-path /user/src/ports/sequelize/seeders/
