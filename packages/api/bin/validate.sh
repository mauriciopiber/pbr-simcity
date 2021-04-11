#!/usr/bin/env bash

yarn test
yarn lint | tail -30
yarn build
yarn start
