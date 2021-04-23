ARG AWS_REGION
FROM 115670576153.dkr.ecr.${AWS_REGION}.amazonaws.com/alpine:3.13 as modules
WORKDIR /app

RUN apk add --no-cache yarn
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile --ignore-optional --production=false && \
    yarn cache clean

FROM 115670576153.dkr.ecr.${AWS_REGION}.amazonaws.com/alpine:3.13 as builder
WORKDIR /app

RUN apk add --no-cache jq yarn
COPY --from=modules /app /app
COPY . /app
RUN yarn build || exit $? && \
    yarn remove $(cat package.json | jq -r '.devDependencies | keys | join(" ")') --offline || true

FROM 115670576153.dkr.ecr.${AWS_REGION}.amazonaws.com/alpine:3.13
WORKDIR /app

RUN apk add --no-cache nodejs
RUN wget https://github.com/segmentio/chamber/releases/download/v2.9.0/chamber-v2.9.0-linux-amd64 -O /usr/local/bin/chamber && chmod +x /usr/local/bin/chamber
COPY --from=builder /app /app

ARG SOURCE_VERSION
ENV SOURCE_VERSION=$SOURCE_VERSION
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/bin/app.js"]
