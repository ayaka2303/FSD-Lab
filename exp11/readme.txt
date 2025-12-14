#step a
cd server
npm install
npm install dotenv
.env: MONGODB_URI=mongodb+srv://dbuser:<password>@fsd-lab.1qd44qk.mongodb.net/?appName=fsd-lab
pwd: iamdbuser
npm start

#step b
ng new client
cd client
npm install
ng serve -o
