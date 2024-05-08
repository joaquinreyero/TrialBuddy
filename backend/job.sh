#!/bin/sh

datetime=$(date +"%Y-%m-%dT%H:%M:00")

url="http://0.0.0.0:8080/api/v1/notification/notificate?date=$datetime"

curl -X 'GET' "$url" -H 'accept: application/json' >> /var/log/cron.log 2>&1
