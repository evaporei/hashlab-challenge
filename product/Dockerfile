FROM node
COPY ./proto /proto
COPY ./js-commons /js-commons
COPY ./product /product-service
RUN cd js-commons \
    && npm install \
    && cd ../product-service \
    && npm install
WORKDIR /product-service
EXPOSE 3000
CMD ["node", "src/bin/index.js"]
