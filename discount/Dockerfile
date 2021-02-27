FROM rust AS discount-service

RUN rustup component add rustfmt

COPY ./proto /proto
WORKDIR /discount-service
COPY ./discount /discount-service

RUN cargo install --path .

EXPOSE 4000

CMD ["discount"]
