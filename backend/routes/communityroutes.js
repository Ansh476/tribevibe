const express = require('express');
const router = express.Router();
const { upload } = require('../cloudConfig');
const jwtMiddleware = require('../middleware/jwt-middleware');
const commcontroller = require('../controllers/commcontrol');

router.get('/', commcontroller.getallComm);

router.post('/create', commcontroller.createcommunity);
router.post('/:communityId/join', jwtMiddleware, commcontroller.joinCommunity);
router.post('/:communityId/exitcomm', jwtMiddleware, commcontroller.exitCommunity);
router.get('/:communityId', commcontroller.getCommDetails);
router.put('/:communityId', commcontroller.updateComm);
router.delete('/:communityId', commcontroller.deleteComm);
router.get('/users/:userId', commcontroller.getCreatorcomm);

router.post('/:communityId/announcement', commcontroller.postannouncement);
router.get('/:communityid/announcement', commcontroller.getannouncement);

router.delete('/:communityid/announcement/:announcementId', commcontroller.deleteannouncement)

router.delete('/:communityid/removeuser/:userId', commcontroller.removeuser)

router.post('/:communityid/feedback', commcontroller.postfeedback)

router.get('/:communityid/feedback', commcontroller.getfeedback)
router.post('/upload', upload.single('image'), commcontroller.uploadImage);
router.get('/created/:userId', commcontroller.getCommunitiesByUserId);
router.get('/joined/:userId', commcontroller.joinedByUserId);
router.get('/:communityId/tags', commcontroller.getCommunitiesByTags); 

router.get('/:communityId/requests', commcontroller.getRequests);
router.post('/:communityId/accept-request', commcontroller.acceptRequest);
router.delete('/:communityId/reject-request', commcontroller.rejectRequest);

module.exports = router;
