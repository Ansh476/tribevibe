const express = require('express');
const router = express.Router();

const commcontroller = require('../controllers/commcontrol');

router.get('/', commcontroller.getallCommunities);

router.post('/', commcontroller.createcommunity);

router.post('/:communityId/join', commcontroller.joinCommunity);

router.get('/:communityId', commcontroller.getCommDetails);

router.patch('/:communityId', commcontroller.updateComm);

router.delete('/:communityId', commcontroller.deleteComm);

router.get('/users/:userId', commcontroller.getCreatorcomm);

