FROM node:8.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN yarn install
COPY dist/ /usr/src/app/dist/

EXPOSE 8080

CMD [ "npm", "start" ]