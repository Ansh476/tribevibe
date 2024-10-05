const mongoose = require('mongoose');
const uniquevalidaator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};
UserSchema.plugin(uniquevalidaator)

const User = mongoose.model('User', UserSchema);
module.exports = User;