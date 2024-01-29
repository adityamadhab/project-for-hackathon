const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User } = require('../db/db');
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authMiddleware } = require('../middleware/middleware');
const saltRounds = 10;

const signupValidation = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstname : zod.string(),
    lastname : zod.string()
});

const signinValidation = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post('/signup', async (req,res) => {
    const { success } = signupValidation.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message : "Email already taken / Incorrent inputs"
        });
    }

    const existingUser = await User.findOne({
        username : req.body.username
    });

    if(existingUser) {
        return res.status(411).json({
            message : "Email already taken / Incorrect inputs"
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = await User.create({
        username : req.body.username,
        password : hashedPassword,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    });

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({
        message : "User created succesfully",
        userId : userId,
        token : token
    });
});

router.post('/signin', async (req, res) => {
    const { success } = signinValidation.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect Credentials"
        });
    }

    const user = await User.findOne({
        username: req.body.username
    });

    if (!user) {
        return res.status(401).json({
            message: "Incorrect Credentials"
        });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({
            message: "Incorrect Credentials"
        });
    }

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.json({
        token: token
    });
});

router.get('/getuser', authMiddleware, async (req,res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router;