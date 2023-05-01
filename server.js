const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db.js');
const router = require("./controllers/routes.js");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use("/", router);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Adopt Dogs Testing'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
