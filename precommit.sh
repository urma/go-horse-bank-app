#!/bin/sh

basedir=$(dirname $0)

${basedir}/node_modules/.bin/eslint ${basedir}
