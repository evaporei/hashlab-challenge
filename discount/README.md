# discount

This service calculates the discount for a product/user.

## Architecture

This project has the following modules:

- `math`: contains math logic;
- `rules`: contains business logic for each of the discount rules;
- `services`: contains each correspondent gRPC service, much like controllers, just passing data to the main logic;
- `ports`: it is the IO for the application, in this case it's only gRPC;
- `ports/grpc`: helps to start the gRPC server.

## Optimizations

### Current

- Once the rules reach 10% in percentage, they will stop applying the next rules;
- The data for each discount rule is only fetched if necessary. On black friday for example, since the discount will already be 10% for everybody, it will not do any request to the `user` service.

### Future

- There could be a cache of the user birthday using as key the `user_id`;
- There could be a cache of the discount percentage using as key the `product_id` and `user_id`.
