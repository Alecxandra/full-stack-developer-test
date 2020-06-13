#!/bin/sh
cmd="$@"

export DATABASE_URL=mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@$MONGO_INITDB_HOST:$MONGO_INITDB_PORT/$MONGO_INITDB_DATABASE?authSource=admin

# make sure database is ready to accept connections
until nc -z $MONGO_INITDB_HOST $MONGO_INITDB_PORT
do
  echo "Waiting for database"
  sleep 2;
done
node /app/bin/createSystemUsers.js
exec $cmd