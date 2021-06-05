FROM registry.piber.network/dev-node:v3.0.1 AS builder


COPY ./node_modules /var/www/node_modules
COPY ./packages /var/www/packages

USER root
RUN chown -R pbr:pbr /var/www
USER pbr


RUN ls -l /var/www

RUN yarn --cwd /var/www/packages/api build

WORKDIR /var/www/packages/api
CMD ["node", "-r", "ts-node/register/transpile-only", "-r", "tsconfig-paths/register", "lib/api/src/server.js"]

EXPOSE 4000
