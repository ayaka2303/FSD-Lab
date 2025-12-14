npm init -y
npm install express mongoose dotenv nodemon

CONNECTION_STRING="ATTACH YOUR MONGODB CONNECTION STRING HERE"
mongodb+srv://dbuser:<db_password>@fsd-lab.1qd44qk.mongodb.net/?appName=fsd-lab

npm start

postman:
baseurl: http://localhost:3000/api/tasks

{
  "title": "Meeting",
  "description": "Meeting at 4pm at COE Department",
  "status": "Pending"
}


create-post read-get update-put delete
