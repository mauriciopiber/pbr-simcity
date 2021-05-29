FROM registry.piber.network/dev-node:v3.0.0 AS builder


COPY ./node_modules /var/www/node_modules
COPY ./packages /var/www/packages


RUN ls -l /var/www

RUN yarn --cwd /var/www/packages/api build

WORKDIR /var/www/packages/api
CMD ["node", "-r", "ts-node/register/transpile-only", "-r", "tsconfig-paths/register", "lib/api/src/server.js"]

EXPOSE 4000
