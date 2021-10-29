ARG AWS_REGION

### cache
FROM 115670576153.dkr.ecr.${AWS_REGION}.amazonaws.com/alpine:3.14 as cache

RUN apk add --no-cache yarn
COPY package.json yarn.lock /app/
RUN --mount=type=tmpfs,target=/__tmpfs,rw cp /app/* /__tmpfs && cd /__tmpfs && \
    yarn install --frozen-lockfile --ignore-optional --production=false

### build
FROM 115670576153.dkr.ecr.${AWS_REGION}.amazonaws.com/alpine:3.14 as build
WORKDIR /app

RUN apk add --no-cache jq yarn
COPY --from=cache /usr/local/share/.cache/yarn /usr/local/share/.cache/yarn
COPY . /app
RUN yarn install --frozen-lockfile --ignore-optional --production=false --offline && \
    yarn build || exit $? && \
    yarn install --frozen-lockfile --ignore-optional --production --offline

###
FROM 115670576153.dkr.ecr.${AWS_REGION}.amazonaws.com/alpine:3.14
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
