const express = require("express");
const mongoose = require("mongoose");
/*
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
*/
require("dotenv").config();

const app = express(); // Creates an Express application
const port = 3000;

// connect to MongoDB

const dbURI = `mongodb+srv://blog_admin:${process.env.MONGODB_ACCESS_PASSWORD}@crudapi.jnual.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    // listen for requests only after connection to the db has been made
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    })
  )
  .catch((err) => console.log(err));

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });
