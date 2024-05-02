const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.get("/", async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Post.create(post);
  res.json(post);
});

router.put("/", async (req, res) => {
  const postId = req.params.id;
  const updatedPostData = req.body;

  try {
    // Find the post by ID
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update the post
    await post.update(updatedPostData);

    res.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = router;