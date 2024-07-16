FROM node:latest

WORKDIR /app

COPY package.json .

RUN bun install

COPY . .

RUN bun build

CMD ["bun", "start"]