const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const cors = require("cors");
const errorHandler = require('./src/middleware/errorHandler');


const PORT = process.env.PORT || 5000;

//require('dotenv').config()
dotenv.config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const propertyRoutes = require('./src/properties/property.route')
app.use("/api/properties", propertyRoutes);

const userRoutes = require('./src/users/user.route')
app.use("/api/users", userRoutes);

app.use(errorHandler);
async function main() {
    await mongoose.connect(process.env.DB_URL);
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    app.use('/', (req,res) => {
        res.send("welcome to Propzilla!");
    })
  }

main().then(() => console.log("Mongodb connect successfully!")).catch(err => console.log(err));
app.listen(PORT, () => console.log(`Server running on port: http://localhost: ${PORT}`));