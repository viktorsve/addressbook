FROM node AS prod

WORKDIR /app

COPY package.json .

RUN npm install

WORKDIR /app/client

COPY ./client/package.json .

RUN npm install

WORKDIR /app

COPY . .

CMD ["npm", "run", "prod"]