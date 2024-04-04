const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adityamadhabborah:Adi1234@cluster0.ypfx49s.mongodb.net/demo-dataset');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        maxLength : 80
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    }
});

const contactSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        trim : true
    },
    subject : {
        type : String,
        required : true,
    }, 
    phone : {
        type : String,
        required : true
    },
    message : {
        type : String
    }
});

const bookingSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        maxLength : 80
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = {
    User,
    Contact,
    Booking
}