#/bin/sh

rm -f ./data.db;
sqlite3 data.db < transform.sql;
rm ./data.db;
