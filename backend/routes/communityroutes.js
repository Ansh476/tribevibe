const express = require('express');
const router = express.Router();

const commcontroller = require('../controllers/commcontrol');

router.get('/', commcontroller.getallComm);

router.post('/', commcontroller.createcommunity);
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
module.exports = router;