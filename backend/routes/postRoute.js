const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { Likes } = require('../models');
const { authenticationHandler } = require('../middlewares/authenticationHandler');


router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authenticationHandler, async (req, res) => {
  try {
    const post = req.body;
    const UserId = req.user.id;
    const username = req.user.username;
    post.username = username;
    post.UserId = UserId;
    const newPost = await Post.create(post);
    res.json(newPost);
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

router.get("/:like", authenticationHandler, async (req, res) => {
  const listOfPosts = await post.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});


module.exports = router;
