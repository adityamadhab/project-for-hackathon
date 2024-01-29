const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const contactRouter = require('./contact');
const bookingRouter = require('./booking');

router.use('/user', userRouter);
router.use('/contact', contactRouter);
router.use('/bookingagent', bookingRouter);

module.exports = router;