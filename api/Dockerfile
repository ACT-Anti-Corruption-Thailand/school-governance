FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./


RUN yarn

COPY . .

RUN yarn build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify
USER fastify

EXPOSE 3000
CMD ["yarn", "start"]
