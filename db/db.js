const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adityamadhab:Aditya%402024@cluster0.n2i1feo.mongodb.net/healthcare-app');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        maxLength : 80
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    firstname : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastname : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    }
});

const contactSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastname : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    email : {
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

const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);

module.exports = {
    User,
    Contact
}