const mongoose = require('mongoose');

const SignupPendingSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed password later
    fullname: { type: String, required: true },
    Phone: { type: String, required: true },
    profilepic: { type: String },
    location: { type: String, required: true },
    otp: { type: String, required: true },
    otpExpires: { type: Date, required: true },
});

const SignupPending = mongoose.model('SignupPending', SignupPendingSchema);
module.exports = SignupPending;
