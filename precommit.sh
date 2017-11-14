#!/bin/sh

# Chain all tests and fail fast in case any of them has issues
git-secrets --scan && \
  ./node_modules/.bin/eslint .
