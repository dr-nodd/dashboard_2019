FROM node:12.2.0-alpine

WORKDIR /dashboard

ENV PATH /dashboard/node_modules/.bin:$PATH

COPY package.json /dashboard/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g

CMD ["npm", "start"]