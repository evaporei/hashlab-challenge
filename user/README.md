# user

This service gets an user by id.

## Architecture

This project has the following modules:

- `bin`: entrypoint of the application;
- `ports`: it is the IO and/or external interface for the application;
- `ports/grpc`: only contains external enums;
- `ports/sequelize`: contains models/migrations for the application's database;
- `presenters`: contains the format the rpcs deliver on response;
- `proto-loader`: contains the loader for protobuf files;
- `services`: contains each correspondent gRPC service, much like controllers, its a glue between the database, responses and main logic.

## Optimizations

### Current

- Since the rpc this service provides either returns an user or not, there's no error handling, just let it crash. This simplifies the code avoiding threating non existing different scenarios, but for the future this handling may be necessary.

### Future

- It could have different response types based if there's the user or not, like returning an enum.
