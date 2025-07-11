const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const cors = require("cors");
const errorHandler = require('./src/middleware/errorHandler');


const PORT = process.env.PORT || 5000;

//require('dotenv').config()
dotenv.config();

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

main()
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log(err));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const propertyRoutes = require('./src/properties/property.route')
app.use("/api/properties", propertyRoutes);

const userRoutes = require('./src/users/user.route')
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to PropZilla!");
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port: http://localhost: ${PORT}`));