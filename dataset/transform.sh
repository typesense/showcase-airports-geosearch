#/bin/sh

echo "Starting data transformation";
rm -f ./data.db;
sqlite3 data.db < transform.sql && echo "Data transformation complete ✅";
rm ./data.db;