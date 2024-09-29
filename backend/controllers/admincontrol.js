const Community = require('../models/community');
const User = require('../models/usermodel');
const HttpError = require('../models/HttpError');

const getAdminView = async (req, res, next) => {
    try {
      const nonCreators = await User.find({ communitiesCreated: { $size: 0 } });
      const creators = await User.find({ communitiesCreated: { $not: { $size: 0 } } })
        .populate({
          path: 'communitiesCreated',
          populate: { path: 'members', select: 'username' }
        });
  
      res.status(200).json({
        message: 'Admin data fetched successfully',
        nonCreators,
        creators
      });
    } catch (error) {
      res.status(500).json({ message: 'Fetching admin data failed.' });
    }
  };

  const deleteUser = async (req, res, next) => {
    const { userId } = req.params; 
    const userRole = req.user.role; // Assume role is set in req.user
  
    try {
      if (userRole !== 'admin') {
        const error = new HttpError(403, 'You are not authorized to delete users.');
        return next(error);
      }
  
      const user = await User.findById(userId).populate('communitiesCreated');
      if (!user) {
        const error = new HttpError(404, 'User not found.');
        return next(error);
      }

      if (user.communitiesCreated.length > 0) {
        await Community.deleteMany({ _id: { $in: user.communitiesCreated } });
      }
  
      await User.findByIdAndDelete(userId);
  
      res.status(200).json({ message: 'User and associated communities deleted successfully.' });
    } catch (err) {
      const error = new HttpError(500, 'Deleting user failed.');
      return next(error);
    }
  };

module.exports = {getAdminView,deleteUser};