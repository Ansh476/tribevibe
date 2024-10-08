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
    location:{
        type: String,
        required: true
    },
    agegrp: {
        type: String,
        enum: ['Above 18', 'Open for All'], 
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'All'], 
        required: true
    },
    membercount:{
        type: Number,
        required: true
    },
    moneystatus: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        required: true
    },
    // creator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    //     }, 
    imageurl: {
        type: String,
        required: false
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
});

const Community = mongoose.model('Community', communityschema);

module.exports = Community;