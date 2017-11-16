FROM node:alpine

EXPOSE 3000

WORKDIR /app
COPY [ ".", "/app/" ]
RUN [ "npm", "install", "--production" ]

CMD [ "node", "/app/index.js" ]
