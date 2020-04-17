FROM node:12.2.0-alpine

WORKDIR /api

ENV PATH /api/node_modules/.bin:$PATH

COPY package.json /api/package.json
RUN npm install

CMD ["npm", "start"]