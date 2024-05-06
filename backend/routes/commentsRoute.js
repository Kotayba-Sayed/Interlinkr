const express = require('express');
const router = express.Router();
const { comments } = require('../models');

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const allComments = await comments.findAll({ where: { PostId: postId } });
  res.json(allComments);
});


router.post("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comment = req.body;
  comment.PostId = postId; // Note: Change postId to PostId (case-sensitive)
  const newComment = await comments.create(comment); // Use comments.create() instead of newComment.create()
  res.json(newComment);
});


router.put("/:id", async (req, res) => {
  const commentId = req.params.id;
  const updatedComment = req.body;
  await comments.update(updatedComment, { where: { id: commentId } });
  res.json(updatedComment);
});

router.delete("/:id", async (req, res) => {
  const commentId = req.params.id;
  await comments.destroy({ where: { id: commentId } });
  res.json({ message: 'Comment deleted successfully' });
});

module.exports = router;
