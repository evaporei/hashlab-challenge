# product

This service gets products and applies discount to them using the `discount` service.

## Architecture

This project has the following modules:

- `app`: contains the express application;
- `bin`: entrypoint of the application;
- `controllers`: contains the handles for each route, its a glue between the database, responses and main logic;
- `logic`: contains the main logic;
- `middlewares`: contains express middlewares;
- `ports`: it is the IO and/or external interface for the application;
- `ports/grpc-client`: client for doing gRPC requests;
- `ports/sequelize`: contains models/migrations for the application's database;
- `presenters`: contains the format the routes deliver on response;
- `routes`: contains all the application routes;
- `schemas`: contains schemas for what every route receives on a request.

## Optimizations

### Current

- If the discount service fails too many times, it will circuit break and stop requesting it for a while.
