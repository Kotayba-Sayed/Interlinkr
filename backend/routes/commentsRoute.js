const express = require('express');
const router = express.Router();
const { comments } = require('../models');
const { authenticationHandler, adminAccessHandler } = require('../middlewares/authenticationHandler');

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const allComments = await comments.findAll({ where: { PostId: postId } });
  res.json(allComments);
});


router.post("/:postId", authenticationHandler, async (req, res) => {
  const postId = req.params.postId;
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  comment.PostId = postId;
  const newComment = await comments.create(comment);
  res.json(newComment);
});


router.put("/:id", authenticationHandler, adminAccessHandler, async (req, res) => {
  try {
    const commentId = req.params.id;
    const updatedComment = req.body;
    const comment = await comment.findOne({ where: { id: commentId } });

    if (comment.UserId !== req.user.id && req.user.username !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to edit this comment' });
    }

    await comment.update(updatedComment, { where: { id: commentId } });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authenticationHandler, adminAccessHandler, async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await comment.findOne({ where: { id: commentId } });

    if (comment.UserId !== req.user.id && req.user.username !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to delete this comment' });
    }

    await comment.destroy({ where: { id: commentId } });
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;