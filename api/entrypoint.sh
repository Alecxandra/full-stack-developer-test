#!/bin/sh
cmd="$@"

export DATABASE_URL=mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@$MONGO_INITDB_HOST:$MONGO_INITDB_PORT/$MONGO_INITDB_DATABASE?authSource=admin

exec $cmd