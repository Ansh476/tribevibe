const Community = require('../models/community');
const User = require('../models/usermodel');
const HttpError = require('../models/HttpError');

const createcommunity = async (req, res, next) => {
  const { title, description, location, agegrp, image, date, time, gender, membercount, creator } = req.body;

  const newCommunity = new Community({
    title,
    description,
    location,
    agegrp,
    image,
    date,
    time,
    gender,
    membercount,
    creator
  });

  try {
    await newCommunity.save();
    const user = await User.findById(creator);
    if (!user) {
      const error = new HttpError(404, 'User not found');
      return next(error);
    }

    user.communitiesCreated.push(newCommunity._id);
    await user.save();

    res.status(201).json({ message: 'Community created!', community: newCommunity });
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
    const communities = await Community.find({}, 'title image');
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
  const userRole = req.user.role;

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


module.exports = { createcommunity, joinCommunity, getallComm, getCommDetails,updateComm, deleteComm, getCreatorcomm};
