FROM node:alpine AS base
WORKDIR /js-commons
COPY ./proto /proto
COPY ./js-commons /js-commons
RUN npm install
WORKDIR /

FROM base AS user-service
WORKDIR /user-service
COPY ./user /user-service
EXPOSE 50051
RUN npm install
CMD ["node", "src/bin/index.js"]
