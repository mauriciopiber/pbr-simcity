FROM registry.piber.network/dev-node:v3.0.1 AS builder


COPY ./node_modules /var/www/node_modules
COPY ./packages /var/www/packages


RUN ls -l /var/www

RUN yarn --cwd /var/www/packages/web build

WORKDIR /var/www/packages/web
CMD ["/var/www/packages/web/node_modules/.bin/next", "start"]

EXPOSE 3000
