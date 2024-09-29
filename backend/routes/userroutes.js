const express = require('express');
const router = express.Router();

const usercontroller = require('../controllers/usercontrol')

router.post('/signup',usercontroller.signup);

router.post('/login',usercontroller.login);

router.get('/creator', usercontroller.getCreatorView);


