#!/bin/sh

docker-compose build user-postgres user-service user-migrate-and-seed
