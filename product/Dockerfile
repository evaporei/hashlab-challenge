FROM node AS base
COPY ./proto /proto
WORKDIR /js-commons
COPY ./js-commons /js-commons
RUN npm install
WORKDIR /

FROM base AS product-service
WORKDIR /product-service
COPY ./product /product-service
EXPOSE 3000
RUN npm install
CMD ["node", "src/bin/index.js"]
