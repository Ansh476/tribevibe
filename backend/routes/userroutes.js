const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/usercontrol');
const jwtMiddleware = require('../middleware/jwt-middleware');


router.post('/signup', [
    body('username').not().isEmpty().withMessage('Username is required.'),
    body('email').isEmail().withMessage('Invalid email address.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('fullname').not().isEmpty().withMessage('Full name is required.'),
    body('Phone').not().isEmpty().withMessage('Phone number is required.'),
    body('location').not().isEmpty().withMessage('Location is required.'),
], userController.signup);

router.post('/verify-otp', [
    body('email').isEmail().withMessage('Invalid email address.'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits.'),
], userController.verifyOtp);

router.post('/login', [
    body('email').not().isEmpty().withMessage('Login field is required.'),
    body('password').not().isEmpty().withMessage('Password is required.'),
], userController.login);

router.get('/creator', jwtMiddleware, userController.getCreatorView);

module.exports = router;
