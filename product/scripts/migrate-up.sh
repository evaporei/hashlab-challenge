#!/bin/sh

docker-compose run product-migrate-and-seed node_modules/.bin/sequelize db:migrate --config src/config/sequelize.js --migrations-path /product/src/ports/sequelize/migrations/
