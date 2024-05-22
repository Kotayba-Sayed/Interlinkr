const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { Likes } = require('../models');
const { authenticationHandler, adminAccessHandler } = require('../middlewares/authenticationHandler');


router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authenticationHandler, adminAccessHandler, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Post.create(post);
  res.json(post);
});


router.put("/:id", authenticationHandler, adminAccessHandler, async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = req.body;
    const post = await Post.findOne({ where: { id: postId } });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.UserId !== req.user.id && req.user.username !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to edit this post' });
    }

    await Post.update(updatedPost, { where: { id: postId } });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE endpoint
router.delete("/:id", authenticationHandler, adminAccessHandler, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({ where: { id: postId } });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.UserId !== req.user.id && req.user.username !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to delete this post' });
    }

    await Post.destroy({ where: { id: postId } });
    res.status(204).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:postId/like", authenticationHandler, adminAccessHandler, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByPk(postId, { include: [Likes] });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const likesCount = post.Likes.length;
    res.json({ postId: postId, likesCount: likesCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
