# hashlab-challenge

Hashlab's Back-end Code Challenge.

For info on the challenge itself: [link](https://github.com/hashlab/hiring/blob/master/challenges/pt-br/back-challenge.md).

## Table of Contents

- [Architecture](#architecture)
- [Installation](#installation)
- [Running](#running)
- [Tests](#tests)
- [Lint](#lint)
- [Features](#features)

## Architecture

The challenge consists on having two main services, the `discount` and the `product` one. I've made the first one in `Rust` and the second one in `JavaScript` (Node.js).

Since the `discount` service needed to access an users table, and I don't feel like this should be this service's responsability, I've created a third service, `user`. They communicate via gRPC as well.

Since the challenge only asks for two services and two languages, I've created the `user` service in `JavaScript` as well to ease not having to review another language. This also made me create another project with common code between the `JavaScript` applications, called `js-commons`.

Below there's an oversimplified sequence diagram of how the services connect. It doesn't include the `js-commons` library, neither the databases. Also not all requests shown are always done, there are some optimizations on this matter explained with more detail in each service.

![example-sequence-diagram](https://user-images.githubusercontent.com/15306309/109600913-c297af00-7afc-11eb-8538-dcb52905f00f.png)

<!--- mermaid.js diagram: --->
<!--- obs: some slashes were put to escape the Github Markdown comments--->

<!--- sequenceDiagram --->
<!---     client->>+product: GET /product --->
<!---     product->>+discount: rpc GetDiscount --->
<!---     discount->>-user: rpc GetUser --->
<!---     user--\>>+discount: user --->
<!---     discount--\>>+product: percentage --->
<!---     product--\>>-client: products w/ discount --->

```
hashlab-challenge
│   ...
└─── discount
│   └─── ...
└─── js-commons
│   └─── ...
└─── product
│   └─── ...
└─── proto
│   └─── ...
└─── scripts
│   └─── ...
└─── scripts
│   └─── ...
└─── user
    └─── ...
```

- The `discount` folder contains `discount` service;
- The `js-commons` folder contains `js-commons` library;
- The `product` folder contains `product` service;
- The `discount` folder contains `discount` service;
- The `proto` folder contains the protobuf files;
- The `scripts` folder contains the script files;
- The `user` folder contains `user` service.

## Installation

To install the project you will need `Docker` and `docker-compose`. There are script files at the [`scripts`](https://github.com/otaviopace/hashlab-challenge/blob/master/scripts) folder which will ease the use of both of these tools.

### Setup

For now the only thing the setup does is to copy the example `.env` files into real ones.

```shell
./scripts/setup.sh
```

### Build

Since the projects use `Docker`/`docker-compose` we'll need to build all images, you can do it with:

```shell
./scripts/build.sh
```

### Migrate

Migrates for the PostgreSQL databases of the `user` and `product` services.

```shell
./scripts/migrate-up.sh
```

### Seed

Seeds examples for the PostgreSQL databases of the `user` and `product` services.

```shell
./scripts/seed-generate.sh
```

## Running

Runs all services in background.

```shell
./scripts/run.sh
```

## Tests

```shell
./scripts/test.sh
```

## Lint

Uses ESLint on JS projects and Cargo formatter in Rust.

```shell
./scripts/lint.sh
```

## Features

If you've ran all commands above you should probably be able to run the gRPCurls and curls below.

### Get User

Get an user which the birthday is today:

> Request
```shell
grpcurl -plaintext -import-path proto -proto user.proto -d '{"user_id": "usr_ckljj7jy900001iofhtrehz8u"}' [::]:50051 user.UserService/GetUser
```

> Response
```shell
{
  "user": {
    "id": "usr_ckljj7jy900001iofhtrehz8u",
    "firstName": "Happy",
    "lastName": "Birthday",
    "dateOfBirth": "2021-03-02"
  }
}
```

Get an user that isn't their birthday:

> Request
```shell
grpcurl -plaintext -import-path proto -proto user.proto -d '{"user_id": "usr_ckljj7jye00011iof2oh53ccr"}' [::]:50051 user.UserService/GetUser
```

> Response
```shell
{
  "user": {
    "id": "usr_ckljj7jye00011iof2oh53ccr",
    "firstName": "No",
    "lastName": "Birthday",
    "dateOfBirth": "2021-02-28"
  }
}
```

### Calculate Discount

Calculate discount when it's the user birthday.

> Request
```shell
grpcurl -plaintext -import-path proto -proto discount.proto -d '{"user_id": "usr_ckljj7jy900001iofhtrehz8u", "product_id": ""}' [::]:4000 discount.DiscountService/GetDiscount
```

> Response
```shell
{
  "discount": {
    "percentage": 5
  }
}
```

Calculate discount when it's not the user birthday.

> Request
```shell
grpcurl -plaintext -import-path proto -proto discount.proto -d '{"user_id": "usr_ckljj7jye00011iof2oh53ccr", "product_id": ""}' [::]:4000 discount.DiscountService/GetDiscount
```

> Response
```shell
{
  "discount": {

  }
}
```

### Get Products (with or without discount by user)
