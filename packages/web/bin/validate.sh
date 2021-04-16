#!/usr/bin/env bash
set -ex


yarn build
yarn start &
yarn test
yarn lint | tail -30
