const Community = require('../models/community');
const User = require('../models/usermodel');
const HttpError = require('../models/HttpError');
const Feedback = require('../models/feedback');
const { cloudinary } = require('../cloudConfig');

require('dotenv').config();

const createcommunity = async (req, res, next) => {
  const { title, description, location, agegrp, date, time, gender, membercount, moneystatus, creator, imageurl } = req.body;

  const newCommunity = new Community({
    title,
    description,
    location,
    agegrp,
    date,
    time,
    gender,
    membercount,
    moneystatus,
    imageurl,
    creator,
    members: [],
  });

  try {
    await newCommunity.save();
    // const user = await User.findById(creator);
    // if (!user) {
    //   const error = new HttpError(404, 'User not found');
    //   return next(error);
    // }

    // user.communitiesCreated.push(newCommunity._id);
    // await user.save();

    res.status(201).json({ message: 'Community created!'});
  } catch (err) {
    const error = new HttpError(500, 'Creating community failed');
    return next(error);
  }
};

const joinCommunity = async (req, res, next) => {
  const { communityId } = req.params;
  const userId = req.user.id; //  authentication middleware (JWT) for req.user

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      const error = new HttpError(404, 'Community not found.');
      return next(error);
    }

    if (community.members.includes(userId)) {
      const error = new HttpError(400, 'User already joined.');
      return next(error);
    }

    community.members.push(userId);
    await community.save();

    const user = await User.findById(userId);
    if (!user) {
      const error = new HttpError(404, 'User not found.');
      return next(error);
    }

    user.communitiesJoined.push(communityId);
    await user.save();

    res.status(200).json({ message: 'Joined community!', community });
  } catch (err) {
    const error = new HttpError(500, 'Joining community failed.');
    return next(error);
  }
};

const getallComm = async (req, res, next) => {
  try {
    const communities = await Community.find({}, 'title imageurl');
    res.status(200).json({ communities });
  } catch (err) {
    const error = new HttpError(500, 'Fetching communities failed.');
    return next(error);
  }
};

const getCommDetails = async (req, res, next) => {
  const { communityId } = req.params;

  try {
    const community = await Community.findById(communityId).populate('creator', 'username');
    if (!community) {
      const error = new HttpError(404, 'Community not found.');
      return next(error);
    }

    res.status(200).json({ community });
  } catch (err) {
    const error = new HttpError(500, 'Fetching community details failed.');
    return next(error);
  }
};

const updateComm = async (req, res, next) => {
  const { communityId } = req.params;
  const updatedData = { ...req.body }; 

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      const error = new HttpError(404, 'Community not found.');
      return next(error);
    }

    for (let key in updatedData) {
      if (updatedData.hasOwnProperty(key)) {
        community[key] = updatedData[key];
      }
    }

    await community.save();

    res.status(200).json({ message: 'Community updated successfully!', community });
  } catch (err) {
    const error = new HttpError(500, 'Updating community failed.');
    return next(error);
  }
};

const deleteComm = async (req, res, next) => {
  const { communityId } = req.params;
  const userId = req.user.id; 
  // const userRole = req.user.role;

  try {
    const community = await Community.findById(communityId).populate('creator');

    if (!community) {
      const error = new HttpError(404, 'Community not found.');
      return next(error);
    }

    if (community.creator.toString() !== userId && userRole !== 'admin') {
      const error = new HttpError(403, 'You are not authorized to delete this community.');
      return next(error);
    }

    await Community.findByIdAndDelete(communityId);

    res.status(200).json({ message: 'Community deleted successfully!' });
  } catch (err) {
    const error = new HttpError(500, 'Deleting community failed.');
    return next(error);
  }
};

const getCreatorcomm = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('communitiesCreated');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      communities: user.communitiesCreated
    });
  } catch (err) {
    res.status(500).json({ message: 'Fetching communities failed.' });
  }
};

function asyncWrap(fn){
  return function(req,res,next){
      fn(req,res,next).catch((err)=>{next(err)});
  }
}

const postannouncement = asyncWrap(async (req, res, next) => {
  const creatorId = req.user.id; // authentication middleware jwt req.user
  const { message, imgfile } = req.body;
  const { communityId } = req.params; 

  const community = await Community.findById(communityId);
  if (!community || community.creator.toString() !== creatorId) {
    return res.status(403).json({ message: "Not authorized to post in this community" });
  }

  let newannouncement = new Announcement({
    message: message,
    imgfile: imgfile,
    created_at: new Date(),
    community: communityId,
    creator: creatorId
  });

  await newannouncement.save();

  res.status(201).json({ message: "Announcement posted successfully!" });
});

const deleteannouncement = asyncWrap(async (req, res, next) => {
  const creatorId = req.user.id; // authentication middleware = req.user
  const { communityId, announcementId } = req.params;

  const community = await Community.findById(communityId);
  if (!community || community.creator.toString() !== creatorId) {
    return res.status(403).json({ message: "Not authorized to delete announcements in this community" });
  }

  const announcement = await Announcement.findById(announcementId);
  if (!announcement || announcement.community.toString() !== communityId) {
    return res.status(404).json({ message: "Announcement not found" });
  }
  await Announcement.findByIdAndDelete(announcementId);
  res.status(200).json({ message: "Announcement deleted successfully!" });
});


const removeuser = async (req, res, next) => {
  const creatorId = req.user.id; //  req.user = authenticated user
  const { communityId, userId } = req.params;

  const community = await Community.findById(communityId);
  if (!community) {
    return res.status(404).json({ message: "Community not found" });
  }

  if (community.creator.toString() !== creatorId) {
    return res.status(403).json({ message: "You are not authorized to remove users from this community" });
  }

  if (!community.members.includes(userId)) {
    return res.status(404).json({ message: "User is not a member of this community" });
  }
  community.members.pull(userId); 
  await community.save();

  res.status(200).json({ message: "User removed from community successfully" });
};

const postfeedback = asyncWrap(async (req, res, next) => {
  const { feedbackmsg, rating } = req.body;
  const { communityId } = req.params;
  const userId = req.user.id; //authentication token

  const community = await Community.findById(communityId);
  if (!community) {
    return res.status(404).json({ message: "Community not found" });
  }
  let newfeedback = new Feedback({
    feedbackmsg: feedbackmsg,
    rating: rating,
    community: communityId,
    user: userId,
  })
  await newfeedback.save();
  res.status(201).json({ message: "Feedback posted successfully!" });
});

const getfeedback = async (req, res, next) => {
  const { communityId } = req.params;
  try{
  const community = await Community.findById(communityId);
  if (!community) {
    return res.status(404).json({ message: "Community not found" });
  }

  const feedback = await Feedback.find({ community: communityId })
    .populate('user', 'username') 
    .populate('community', 'name'); 

  res.status(200).json({ feedback });
}catch(err){
  res.status(500).json({ message: "Fetching feedback failed" });
}};

const uploadImage = async (req, res) => {
  try {
      const file = req.file; 
      if (!file) {
          return res.status(400).json({ message: 'No file uploaded.' });
      }
      const imageUrl = file.path; 
      console.log(imageUrl);
      return res.json({
          message: 'Image uploaded successfully',
          url: imageUrl,
      });
  } catch (error) {
      return res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

const getCommunitiesByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
      const communities = await Community.find({ creator: userId });
    
      if (!communities) {
          return res.status(404).json({ message: 'No communities found for this user.' });
      }
      return res.status(200).json(communities);
  } catch (error) {
      console.error('Error fetching communities:', error);
      return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createcommunity, joinCommunity, getallComm, getCommDetails,updateComm, deleteComm, getCreatorcomm,postannouncement,deleteannouncement,removeuser,postfeedback,getfeedback, uploadImage, getCommunitiesByUserId};
