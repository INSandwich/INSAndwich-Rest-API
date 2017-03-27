#!/bin/bash

npm install
if [ ! -f insandwich.db ]; then
  sqlite3 insandwich.db < sql/insandwich.sql
fi
npm run start
