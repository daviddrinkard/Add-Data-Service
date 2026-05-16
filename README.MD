Add Data Microservice

# About

This is a microservice using Express and ZeroMQ to allow users to send requests to insert records
into predetermined databases. Currently supports MongoDB and Supabase, and limited table insertions
for each.

This microservice was written using documentation from Express and ZeroMQ with the assistance of CoPilot
to integrate workflow for message queueing.

# Requests

Here is an example POST request:

curl -X POST http://localhost:3000/add \
 -H "Content-Type: application/json" \
 -H "x-api-key: TEST-KEY-ABC123" \
 -d '{
"appId": "app-C",
"resourceType": "location",
"data": {
"name": "OSU Campus",
"street_address": "1500 SW Jefferson Way",
"city": "Corvallis",
"state": "OR",
"zip": "97331",
"phone": "555-123-4567",
"email": "info@osu.edu"
}
}'
