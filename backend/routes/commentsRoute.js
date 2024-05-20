const express = require('express');
const router = express.Router();
const { comments } = require('../models');
const { authenticationHandler } = require('../middlewares/authenticationHandler');

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


router.put("/:id", authenticationHandler, async (req, res) => {
  try {
    const commentId = req.params.id;
    const updatedComment = req.body;
    const comment = await Comment.findOne({ where: { id: commentId } });

    if (comment.UserId !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to edit this comment' });
    }

    await Comment.update(updatedComment, { where: { id: commentId } });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authenticationHandler, async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findOne({ where: { id: commentId } });

    if (comment.UserId !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to delete this comment' });
    }

    await Comment.destroy({ where: { id: commentId } });
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;