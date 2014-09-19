Todo-REST-NodeJS
================

A simple "todo" web application with RESTful APIs using Node.js

GET: curl -i http://localhost:3000/api/todos
GET: curl -i http://localhost:3000/api/todos/f47b6329-e3db-4af2-e2a1-6fd818ab08ac
POST: curl -i -X POST -H "Content-Type: application/json" -d '{"content": "Get the milk"}' http://localhost:3000/api/todos
PUT: curl -i -X PUT -H "Content-Type: application/json" -d '{"content": "Go to gym"}' http://localhost:3000/api/todos/63744428-dee8-d987-25c6-e7ee45bcf04c
