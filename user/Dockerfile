FROM node
COPY ./proto /proto
COPY ./js-commons /js-commons
COPY ./user /user-service
RUN cd js-commons \
    && npm install \
    && cd ../user-service \
    && npm install
WORKDIR /user-service
EXPOSE 50051
CMD ["node", "src/bin/index.js"]
