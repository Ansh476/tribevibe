const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announceschema = new Schema({
    message: {
        type: String,
        required: true
    },
    imgfile: {
        type: String, 
        required: true
    }
}, { timestamps: true });

const Announcement = mongoose.model('Announcement', announceschema);

module.exports = Announcement;
