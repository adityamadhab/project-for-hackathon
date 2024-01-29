const express = require('express');
const router = express.Router();
const zod = require('zod');
const { Contact } = require('../db/db');

const updateValidation = zod.object({
    firstname : zod.string(),
    lastname : zod.string(),
    email : zod.string().email(),
    message : zod.string().optional()
});

router.post('/form', async (req,res)=>{
    const { success } = updateValidation.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message : "Incorrect information entered"
        });
    }

    const details = await Contact.create({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        message : req.body.message,
        phone : req.body.phone
    });

    res.json({
        firstname : details.firstname,
        lastname : details.lastname,
        email : details.email,
        phone : details.phone,
        message : details.message
    });

});

module.exports = router;