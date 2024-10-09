const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackschema = new Schema({
    feedbackmsg: {
        type: String,
        required: true
    },
    rating: {
        type: Number, 
        required: true,
        enum: [1, 2, 3, 4, 5], 
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackschema);
module.exports = Feedback;