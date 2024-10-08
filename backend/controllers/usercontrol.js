const User = require('../models/usermodel');
const HttpError = require('../models/HttpError');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
// const { cloudinary } = require('../cloudConfig');

require('dotenv').config();

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError('Invalid inputs, please check your data.', 422);
        return next(error);
    }

    const { username, email, password, fullname, Phone, profilepic, location } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.error(err);
        const error = new HttpError('Signup failed, please try again.', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('Email already exists.', 422);
        return next(error);
    }

    const newUser = new User({
        username,
        email,
        password,
        fullname,
        Phone,
        location,
        communitiesCreated: [],
        communitiesJoined: [],
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    newUser.otp = otp;
    newUser.otpExpires = Date.now() + 15 * 60 * 1000; // 15 min

    try {
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        await transporter.sendMail({
            to: email,
            subject: 'Your OTP Verification Code for TribeVibe',
            text: `Your OTP code is ${otp}. It is valid for 15 minutes.`,
        });

        res.status(201).json({
            message: 'User created successfully. Please check your email for the OTP.',
            token, // JWT token passed
            userId: newUser.id,
        });
    } catch (err) {
        console.error(err);
        const error = new HttpError('Signup failed, please try again.', 500);
        return next(error);
    }
};


const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;

    let user;
    try {
        user = await User.findOne({ email });
    } catch (err) {
        console.error(err);
        const error = new HttpError('Verification failed, please try again.', 500);
        return next(error);
    }

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    user.isVerified = true;
    user.otp = undefined; // Clear OTP
    user.otpExpires = undefined; 

    try {
        await user.save();
        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (err) {
        console.error(err);
        const error = new HttpError('Verification failed, please try again.', 500);
        return next(error);
    }
};

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError('Invalid inputs, please check your data.', 422);
        return next(error);
    }
 
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.error(err);
        const error = new HttpError('Login failed, please try again.', 500);
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError('User not found.', 401);
        return res.status(401).json({ message: error.message });
    }

    // if (!existingUser.isVerified) {
    //     return res.status(403).json({ message: 'Email not verified.' });
    // }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        const error = new HttpError('Invalid credentials.', 401);
        return res.status(401).json({ message: error.message });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET);

    res.status(200).json({
        message: 'Login successful',
        token,
        userId: existingUser.id,
    });
};

const getCreatorView = async (req, res, next) => {
    const creatorId = req.user.id; 
    try {
        const creator = await User.findById(creatorId).populate({
            path: 'communitiesCreated',
            populate: { path: 'members', select: 'username email' },
        });

        if (!creator) {
            return res.status(404).json({ message: 'Creator not found.' });
        }
        res.status(200).json({
            message: 'Creator data fetched successfully',
            communitiesCreated: creator.communitiesCreated,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fetching creator data failed.' });
    }
};


module.exports = { signup, verifyOtp, login, getCreatorView };
