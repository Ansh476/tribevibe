const User = require('../models/usermodel');
const Community = require('../models/community');
const HttpError = require('../models/HttpError');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        profilepic,
        location,
        communitiesCreated: [],
        communitiesJoined: [],
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        const error = new HttpError('Signup failed, please try again.', 500);
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
    console.log(req.body);
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
        console.log("user not found");
        return res.status(401).json({ message: error.message });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    console.log(`correcct password : ${existingUser.password}`);
    if (!isPasswordValid) {
        const error = new HttpError('Invalid credentials.', 401);
        console.log("incorrect id/password");
        return res.status(401).json({ message: error.message });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET);

    res.status(200).json({
        message: 'Login successful',
        token,
        userId: existingUser.id 
    });
};


// Get creator view function
const getCreatorView = async (req, res, next) => {
    const creatorId = req.user.id; // authentication middleware jwt req.user
    try {
        const creator = await User.findById(creatorId).populate({
            path: 'communitiesCreated',
            populate: { path: 'members', select: 'username email' }
        });

        if (!creator) {
            return res.status(404).json({ message: 'Creator not found.' });
        }
        res.status(200).json({
            message: 'Creator data fetched successfully',
            communitiesCreated: creator.communitiesCreated
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fetching creator data failed.' });
    }
};

module.exports = { getCreatorView, signup, login };
