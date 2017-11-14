#!/bin/sh

basedir=$(dirname $0)

# Chain all tests and fail fast in case any of them has issues
git-secrets --scan ${basedir} && \
  ${basedir}/node_modules/.bin/eslint ${basedir}
