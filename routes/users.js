"use strict";

const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User", require("../models/user.model"));

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).catch(err =>
    console.log(err)
  );

  if (user)
    if (user.checkPassword(password))
      res.status(200).json({ message: "ok" });
    else res.status(401).json({ message: "bad password" });
  else res.status(401).json({ message: "email not exist" });
});

router.post('/', (req, res) => {

  User.create(req.body, (err, user) => {
    if(err) {
      res.status(418).json({message: "erreur"});
    } else {
      res.status(201).json(user);
    }
  });

});

module.exports = router;