const express = require('express');
const router = express.Router();
const zod = require('zod');
const { Contact } = require('../db/db');

const updateValidation = zod.object({
    fullname : zod.string(),
    subject : zod.string().email(),
    phone : zod.string(),
    message : zod.string().optional()
});

router.post('/contact', async (req,res)=>{
    const { success } = updateValidation.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message : "Incorrect information entered"
        });
    }

    const details = await Contact.create({
        fullname : req.body.fullname,
        subject : req.body.subject,
        phone : req.body.phone,
        message : req.body.message,
    });

    res.json({
        fullname : details.fullname,
        subject : details.subject,
        phone : details.phone,
        message : details.message
    });

});

module.exports = router;