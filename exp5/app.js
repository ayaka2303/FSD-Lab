const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require('./config/dbConnection');

connectDB();

const app = express();
const PORT = 5000;

app.use(express.json());

const contactRoutes = require('./routes/contactRoutes');
app.use("/api/contacts", contactRoutes);

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING AT PORT 5000");
});
