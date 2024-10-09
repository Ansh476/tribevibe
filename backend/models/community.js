const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const communityschema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    agegrp: {
        type: String,
        enum: ['Above 18', 'Open for All'], 
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'All'], 
        required: true
    },
    membercount: {
        type: Number,
        required: true,
        default: 0 // Added default member count
    },
    moneystatus: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        required: true
    },
    approval: {
        type: String,
        enum: ['Open Community', 'Approved Only'],
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Ensure creator is always specified
    }, 
    imageurl: {
        type: String,
        required: false
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    tags: [
        {
            type: String,
            required: false
        }
    ],
    joinRequests: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    
});

const Community = mongoose.model('Community', communityschema);

module.exports = Community;
