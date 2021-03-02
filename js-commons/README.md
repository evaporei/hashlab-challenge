# js-commons

This is a library that contains common code between JS applications.

## Architecture

This project has the following modules:

- `config`: contains the different types of configuration;
- `errors`: contains all error types;
- `logger`: contains a logger for regular use and for HTTP requests;
- `logic`: contains pure business logic. It has no IO whatsoever;
- `ports`: it is the IO for the applications, either being the database, http, it doesn't matter;
- `ports/circuit-breaker`: functionality to break circuit when something errors too much;
- `ports/grpc`: helps to create and start gRPC servers;
- `ports/http`: helps to create and start HTTP servers;
- `ports/repository`: it abstracts some kind of storage/database, for now it has implementation only for Sequelize;
- `ports/sequelize`: code for communicating with a SQL database, for now it is configured with PostgreSQL.
