# hashlab-challenge

Hashlab's Back-end Code Challenge.

## Table of Contents

- [Installation](#installation)
- [Running](#running)
- [Tests](#tests)
- [Lint](#lint)
- [Features](#features)
- [Architecture](#architecture)

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

## Tests

Just run:

```shell
./scripts/test.sh
```

## Lint

Just run:

```shell
./scripts/lint.sh
```

## Features

- Get User
- Calculate Discount
- Get Products (with or without discount by user)

## Architecture

Since there are four (three applications + one library) projects there's a `README.md` on both folders explaining the architecture.

- [js-commons](https://github.com/otaviopace/hashlab-challenge/blob/master/js-commons/README.md)
- [user-service](https://github.com/otaviopace/hashlab-challenge/blob/master/user/README.md)
- [discount-service](https://github.com/otaviopace/hashlab-challenge/blob/master/discount/README.md)
- [product-service](https://github.com/otaviopace/hashlab-challenge/blob/master/product/README.md)
