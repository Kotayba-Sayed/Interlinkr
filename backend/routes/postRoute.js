const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { authenticationHandler } = require('../middlewares/authenticationHandler');


router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", authenticationHandler, async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = req.body;
    const post = await Post.findOne({ where: { id: postId } });

    if (post.UserId !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to edit this post' });
    }

    await Post.update(updatedPost, { where: { id: postId } });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authenticationHandler, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({ where: { id: postId } });

    if (post.UserId !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to delete this post' });
    }

    await Post.destroy({ where: { id: postId } });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
