# syntax=docker/dockerfile:1
### manifest
FROM public.ecr.aws/docker/library/node:20-alpine as manifest

COPY package.json yarn.lock /tmp/
RUN sed -e 's/"version": "[^"]\+",/"version": "0.0.0",/' -i /tmp/package.json

### builder
FROM public.ecr.aws/docker/library/node:20-alpine as builder
WORKDIR /app

COPY --from=manifest /tmp/package.json /tmp/yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-optional

### build
FROM builder as build

COPY . .
RUN yarn build && \
    yarn install --frozen-lockfile --ignore-optional --production --offline

### base
FROM public.ecr.aws/docker/library/node:20-alpine as base
WORKDIR /app

RUN wget https://github.com/segmentio/chamber/releases/download/v2.10.12/chamber-v2.10.12-linux-amd64 -O /usr/local/bin/chamber && \
    echo 'd9657b42373bfa4ec883332704ce6bf7cdeef2bc31da0f825aba7648c75f4ed5  /usr/local/bin/chamber' | sha256sum -c && \
    chmod +x /usr/local/bin/chamber

### app
FROM base as app

COPY --from=build /app .

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/bin/app.js"]
