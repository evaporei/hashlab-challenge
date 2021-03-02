FROM rust

RUN rustup component add rustfmt

COPY ./proto /proto
COPY ./discount /discount-service
WORKDIR /discount-service

RUN cargo install --path .

EXPOSE 4000

CMD ["discount"]
