ARG AWS_REGION

### builder
FROM 115670576153.dkr.ecr.${AWS_REGION}.amazonaws.com/alpine:3.14 as builder
WORKDIR /app

RUN apk add --no-cache yarn
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile --ignore-optional

### build
FROM builder as build

COPY . /app
RUN yarn build || exit $? && \
    yarn install --frozen-lockfile --ignore-optional --production --offline

### app
FROM 115670576153.dkr.ecr.${AWS_REGION}.amazonaws.com/alpine:3.14 as app
WORKDIR /app

RUN apk add --no-cache nodejs
RUN wget https://github.com/segmentio/chamber/releases/download/v2.10.6/chamber-v2.10.6-linux-amd64 -O /usr/local/bin/chamber && \
    echo '8b2750d2f93c6014c7a26d5695472a9d164624915fb140879abe77d746356f5f  /usr/local/bin/chamber' | sha256sum -c && \
    chmod +x /usr/local/bin/chamber
COPY --from=build /app /app

ARG SOURCE_VERSION
ENV SOURCE_VERSION=$SOURCE_VERSION
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/bin/app.js"]
