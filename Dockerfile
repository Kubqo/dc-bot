FROM node:16.10.0-alpine3.11

RUN apk add g++ make python

# Create Directory for the Container
WORKDIR /usr/app

COPY package.json .
RUN yarn install
COPY ./src ./src
COPY .env .env
# Start
CMD [ "yarn", "start" ]
EXPOSE 7001