const express = require('express');
const router = express.Router();
const { upload } = require('../cloudConfig');

const commcontroller = require('../controllers/commcontrol');

router.get('/', commcontroller.getallComm);

router.post('/create', commcontroller.createcommunity);
router.post('/:communityId/join', commcontroller.joinCommunity);
router.get('/:communityId', commcontroller.getCommDetails);
router.patch('/:communityId', commcontroller.updateComm);
router.delete('/:communityId', commcontroller.deleteComm);
router.get('/users/:userId', commcontroller.getCreatorcomm);

router.post('/:communityid/announcement', commcontroller.postannouncement);

router.delete('/:communityid/announcement/:announcementId', commcontroller.deleteannouncement)

router.delete('/:communityid/removeuser/:userId', commcontroller.removeuser)

router.post('/:communityid/feedback', commcontroller.postfeedback)

router.post('/:communityid/feedback', commcontroller.getfeedback)
router.post('/upload', upload.single('image'), commcontroller.uploadImage);
router.get('/created/:userId', commcontroller.getCommunitiesByUserId);
module.exports = router;