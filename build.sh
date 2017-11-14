#!/bin/sh

image_name=$(/usr/bin/jq -r '.name' package.json)
docker build -t ${image_name}:latest $(pwd)
