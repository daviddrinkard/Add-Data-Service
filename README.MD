Add Data Microservice

# About

This is a microservice using an ExpressJS API that handles upserting information to multiple databases
depending on the give input.

# Requests

Here is an example POST request:

curl -X POST http://localhost:3000/add \
 -H "Content-Type: application/json" \
 -H "x-api-key: TEST-KEY-ABC123" \
 -d '{
"appId": "app-A",
"resourceType": "user",
"data": {
"firstName": "Dave",
"lastName": "Drinkard",
"email": "drinkarj@oregonstate.edu"
}
}'
