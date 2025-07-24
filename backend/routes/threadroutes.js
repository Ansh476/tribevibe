const express = require('express');
const router = express.Router();
const Thread = require('../models/thread');
const jwtMiddleware = require('../middleware/jwt-middleware');

// Get all threads for a community
router.get('/:communityId', jwtMiddleware, async (req, res) => {
  try {
    const threads = await Thread.find({ community: req.params.communityId })
      .populate('creator', 'username')
      .populate('replies.user', 'username')
      .sort({ createdAt: -1 });
    res.json({ threads });
  } catch (err) {
    console.error('Error fetching threads:', err);
    res.status(500).json({ message: 'Failed to fetch threads' });
  }
});

// Create a thread in a community (only text, no title/description)
router.post('/:communityId', jwtMiddleware, async (req, res) => {
  try {
    const thread = new Thread({
      community: req.params.communityId,
      creator: req.user._id,
      text: req.body.text
    });
    await thread.save();
    res.status(201).json({ thread });
  } catch (err) {
    console.error('Error creating thread:', err);
    res.status(500).json({ message: 'Failed to create thread' });
  }
});

// Add reply to a thread
router.post('/:communityId/:threadId/reply', jwtMiddleware, async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.threadId);
    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    const reply = { user: req.user._id, text: req.body.text };
    thread.replies.push(reply);
    await thread.save();

    // Return just the new reply with populated username
    const populated = await Thread.findById(thread._id)
      .populate('replies.user', 'username');

    const newReply = populated.replies[populated.replies.length - 1];

    res.status(201).json({ reply: newReply });
  } catch (err) {
    console.error('Error adding reply:', err);
    res.status(500).json({ message: 'Failed to add reply' });
  }
});

module.exports = router;
