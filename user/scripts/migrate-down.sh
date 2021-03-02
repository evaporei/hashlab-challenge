#!/bin/sh

docker-compose run user-migrate-and-seed node_modules/.bin/sequelize db:migrate:undo --config src/config/sequelize.js --migrations-path /user/src/ports/sequelize/migrations/
