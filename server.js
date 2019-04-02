"use strict";

const app = require("express")();
import { model, connect } from "mongoose";
import { json, urlencoded } from "body-parser";
import "./models/user";
const User = model("User");

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).catch(err =>
    console.log(err)
  );

  if (user)
    if (password === user.hash_password)
      res.status(200).json({ message: "ok" });
    else res.status(401).json({ message: "bad password" });
  else res.status(401).json({ message: "email not exist" });
});

// users/login

// users/logout

// users/register

// books - GET - view all

// books/:id - GET - view one

// books - POST

// books/:id - PUT

// books/:id - DELETE

connect("mongodb://localhost/test", {keepAlive: 1, useNewUrlParser: true})
  .then(() => {
    app.listen(3030, () => {
      console.log("⤷ http://localhost:3030");
    });
  })
  .catch(err => console.log(err));
