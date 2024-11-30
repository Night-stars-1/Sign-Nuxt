FROM node:22-alpine AS builder
# Use Docker Buildkit for faster build times (https://docs.docker.com/build/buildkit/)
ENV DOCKER_BUILDKIT=1

WORKDIR /app

COPY . .

RUN npm i pnpm -g && pnpm i

RUN pnpm run build

FROM node:22-alpine

ENV NODE_ENV=PRODUCTION

WORKDIR /app

COPY --from=builder /app/.output ./

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "node", "./server/index.mjs" ]