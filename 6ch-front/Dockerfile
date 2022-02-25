FROM node:17-alpine
RUN apk update && apk add curl
WORKDIR /usr/app
COPY . /usr/app
RUN chown -R node /usr/app
USER node
RUN chmod +x /usr/app/start.sh
RUN sed -i 's/\r//' *.sh
RUN npm install /usr/app
