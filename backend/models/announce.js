const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announceschema = new Schema({
    message: {
        type: String,
        required: true
    },
    imgfile: {
        type: String,
        required: false
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Community' // Reference to the Community model
    }
}, { timestamps: true });

const Announcement = mongoose.model('Announcement', announceschema);

module.exports = Announcement;
