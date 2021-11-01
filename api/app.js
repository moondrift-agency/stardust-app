const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

//routes
const userRoutes = require("./routes/user.routes");
const postsRoutes = require("./routes/posts.routes");

//database
const { sequelize } = require('./models/index');

const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/upload', express.static('upload'));

const dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
dbTest();

module.exports = app;