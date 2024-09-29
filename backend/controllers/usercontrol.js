const User = require('../models/usermodel');
const Community = require('../models/community');
const HttpError = require('../models/HttpError');
const {Validationresult} = require('express-validator');


const signup = async () => {
    const errors = Validationresult(req);
    if(!errors.isEmpty()){
        const error = new HttpError('Invalid inputs, please check your data.',422);
        return next(error);
    }

    const {username, email,password,fullname,Phone,profilepic,location}=req.body;

    let existinguser 
    try{
        existinguser = await User.findOne({email: email})
    }catch(err){
        const error = new HttpError('Signup faied.',500)
        return next(error);
    }

    if(existinguser){
        const error = new HttpError('Email already exists.',422)
        return next(error);
    }

    const newUser= new User({
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
      try{
        await newUser.save();
      }
      catch(err){
        console.error(err);
        res.status(500).send('Server Error');
      }
}

const login = async () => {
    const errors = Validationresult(req);
    if(!errors.isEmpty()){
        const error = new HttpError('Invalid inputs, please check your data.',422);
        return next(error);
    }

    const {loginfield,password}=req.body;

    let existinguser 
    try{
        existinguser = await User.findOne({
            $or: [
              { email: loginfield },
              { username: loginfield},
              { Phone: loginfield}
            ]
        });
    }catch(err){
        const error = new HttpError('Signup faied.',500)
        return next(error);
    }
    if(!existinguser || existinguser.password === password){
        const error = new HttpError('Invalid credentials.',500)
        return next(error);
    }
}

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
      res.status(500).json({ message: 'Fetching creator data failed.' });
    }
  };
  
module.exports = { getCreatorView, signup ,login};
