FROM node:latest

ARG MONGO_DB_URI
ARG PORT

WORKDIR /

COPY ./package.json ./
COPY ./package-lock.json ./

ENV mongo_db_uri=$MONGO_DB_URI
ENV port=$PORT

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node", "controller.mjs" ]
