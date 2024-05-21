const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken')
const { authenticationHandler } = require('../middlewares/authenticationHandler');


router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 15);
    await Users.create({
      username: username,
      password: hash,
    });
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }
    const token = sign({ username: user.username, id: user.id }, "secretkey")
    res.status(200).json({ token: token, username: username, id: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
);


router.put("/changepassword", authenticationHandler, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: { username: req.user.username } });

    bcrypt.compare(oldPassword, user.password, async (err, result) => {
      if (err) {
        return res.status(400).send("Invalid password");
      }
      if (result) {
        const hash = await bcrypt.hash(newPassword, 15);
        await Users.update({ password: hash }, { where: { username: req.user.username } });
        return res.status(200).send("Password updated successfully");
      }
      return res.status(400).send("Old password is incorrect");
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/profile", authenticationHandler, async (req, res) => {
  res.json(req.user);
});




module.exports = router;
