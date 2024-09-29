const express = require('express');
const router = express.Router();

const admincontroller = require('../controllers/admincontrol');

router.get('/view', admincontroller.getAdminView);

router.delete('/users/:userId',admincontroller.deleteUser);