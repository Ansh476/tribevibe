const Community = require('../models/community');
const User = require('../models/usermodel');
const HttpError = require('../models/HttpError');
const Feedback = require('../models/feedback');
const { cloudinary } = require('../cloudConfig');

require('dotenv').config();

const createcommunity = async (req, res, next) => {
  const { title, description, location, agegrp, date, time, gender, membercount, moneystatus, approval, creator, imageurl,tags } = req.body;
  console.log(req.body);

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
    approval,
    imageurl,
    creator,
    tags,
    members: [],
    joinRequests: approval === 'Approved Only' ? [] : undefined, 
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

    res.status(201).json({ message: 'Community created!'});
  } catch (err) {
    const error = new HttpError(500, 'Creating community failed');
    return next(error);
  }
};


const joinCommunity = async (req, res, next) => {
  const { communityId } = req.params;
  const userId = req.user.id;

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return next(new HttpError(404, 'Community not found.'));
    }

    const user = await User.findById(userId); 
    if (!user) {
      return next(new HttpError(404, 'User not found.'));
    }

    if (community.approval === 'Open Community') {
      if (community.members.includes(userId)) {
        return next(new HttpError(400, 'User already joined.'));
      }

      community.members.push(userId);
      user.communitiesJoined.push(communityId); 
      await Promise.all([community.save(), user.save()]); 
      return res.status(200).json({ message: 'Joined community!', community });
    } else {
      const existingRequest = community.joinRequests.find(req => req.userId.equals(userId));
      if (existingRequest) {
        return next(new HttpError(400, 'Join request already submitted.'));
      }

      community.joinRequests.push(userId ); 
      // user.communitiesJoined.push(communityId);
      await community.save(); 
      return res.status(200).json({ message: 'Join request submitted!', community });
    }
  } catch (err) {
    return next(new HttpError(500, 'Joining community failed.'));
  }
};

const exitCommunity = async (req, res, next) => {
  const { communityId } = req.params;
  const userId = req.user.id;

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return next(new HttpError(404, 'Community not found.'));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new HttpError(404, 'User not found.'));
    }

    if (!community.members.includes(userId)) {
      return next(new HttpError(400, 'User is not a member of this community.'));
    }

    // Remove user from the community's members
    community.members = community.members.filter(member => !member.equals(userId));

    // Correctly filter out the communityId from the user's communitiesJoined
    user.communitiesJoined = user.communitiesJoined.filter(id => !id.equals(communityId));

    await Promise.all([community.save(), user.save()]);

    return res.status(200).json({ message: 'Exited community!', community });
  } catch (err) {
    return next(new HttpError(500, 'Exiting community failed.'));
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
  const creatorId = req.user.id; 
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

const joinedByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
      const user = await User.findById(userId).populate('communitiesJoined'); 

      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      if (!user.communitiesJoined || user.communitiesJoined.length === 0) {
          return res.status(404).json({ message: 'No communities found for this user.' });
      }
      
      return res.status(200).json(user.communitiesJoined);
  } catch (error) {
      console.error('Error fetching communities:', error);
      return res.status(500).json({ message: 'Server error' });
  }
};

const postfeedback = asyncWrap(async (req, res, next) => {
  console.log("Request Body:", req.body);
  console.log("Request Params:", req.params);

  const { feedbackmsg, rating } = req.body;
  const communityId = req.params.communityid; // ensure casing matches

  // Fetch community with populated creator details
  const community = await Community.findById(communityId).populate('creator'); // Ensure you populate the creator field

  if (!community) {
      return res.status(404).json({ message: "Community not found" });
  }

  // Get userId from the community's creator
  const userId = community.creator._id; // Ensure you are accessing the correct field

  let newFeedback = new Feedback({
      feedbackmsg: feedbackmsg,
      rating: rating,
      community: communityId,
      user: userId,
  });
  
  await newFeedback.save();
  res.status(201).json({ message: "Feedback posted successfully!" });
});

const getfeedback = asyncWrap(async (req, res, next) => {
  try {
    const communityId = req.params.communityid; // Fetching communityId from request parameters
// Log the communityId

    // Fetch feedbacks for the community and populate user details
    const feedbacks = await Feedback.find({ community: communityId })
      .populate('user', 'username') // Populate 'user' with only the 'username'
      .sort({ createdAt: -1 }); // Sort by newest feedbacks first
// Log the fetched feedbacks
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error); // Log the error
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
});

const getCommunitiesByTags = async (req, res, next) => {
  const { tags } = req.body;

  try {
    const communities = await Community.find({ tags: { $in: tags } });
    if (!communities.length) {
      return res.status(404).json({ message: 'No communities found for the specified tags.' });
    }

    res.status(200).json({ communities });
  } catch (err) {
    return next(new HttpError(500, 'Fetching communities by tags failed.'));
  }
};

module.exports = { createcommunity, joinCommunity, getallComm, getCommDetails,updateComm, deleteComm, getCreatorcomm,postannouncement,deleteannouncement,removeuser,postfeedback,getfeedback, uploadImage, getCommunitiesByUserId, joinedByUserId, exitCommunity, getCommunitiesByTags};
