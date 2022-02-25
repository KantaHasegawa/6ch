#!/bin/sh

until curl -i http://backend:9000/threads --silent
  do
    echo "wating..."
    sleep 5
  done

command="npm run build && npm run start"

eval $command
