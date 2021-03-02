#!/bin/sh

docker-compose run discount-service cargo fmt -- --check
