"use strict";

const app = require("express")();
const mongoose = require("mongoose");
const {json, urlencoded} = require("body-parser");

app.use(json());
app.use(urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS, POST, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "access-control-allow-origin, Accept, Content-Type"
  );
  next();
});

app.use("/users", require('./routes/users'));

// users/login

// users/logout

// users/register

// books - GET - view all

// books/:id - GET - view one

// books - POST

// books/:id - PUT

// books/:id - DELETE

mongoose.connect("mongodb://localhost/test", {keepAlive: 1, useNewUrlParser: true})
  .then(() => {
    app.listen(3030, () => {
      console.log("⤷ http://localhost:3030");
    });
  })
  .catch(err => console.log(err));
