const mongoose = require('mongoose');
const uniquevalidaator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const Userschema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    profilepic:{
        type: String,
    },
    location:{
        type: String,
        required: true
    },
    communitiesCreated: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    }],
    communitiesJoined: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    }],
});

Userschema.plugin(uniquevalidaator)

const User = mongoose.model('User', Userschema);
module.exports = User;