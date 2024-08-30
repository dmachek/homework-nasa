FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV API_URL=https://data.nasa.gov/resource/y77d-th95.json

COPY . .

CMD ["node", "index.js"]
