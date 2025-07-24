const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },  // changed from title+description to single text
  createdAt: { type: Date, default: Date.now },
  replies: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;
