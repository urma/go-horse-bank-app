FROM node:alpine

ENV http_proxy=http://172.17.0.1:3128/
ENV https_proxy=http://172.17.0.1:3128/
ENV no_proxy=::1,127.0.0.1

EXPOSE 3000

WORKDIR /app
COPY [ ".", "/app/" ]
RUN [ "npm", "install", "--production" ]

CMD [ "node", "/app/index.js" ]
