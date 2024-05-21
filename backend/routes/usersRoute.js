const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken')
const { authenticationHandler, adminAccessHandler } = require('../middlewares/authenticationHandler');


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

router.get("/all", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/Delete", authenticationHandler, adminAccessHandler, async (req, res) => {
  try {
    if (req.user.username !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to delete user profiles' });
    }

    const userToDelete = await Users.findByPk(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    await Users.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
