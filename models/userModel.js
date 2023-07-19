const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true, 'Please enter a username']
    },
    email:{
        type: String,
        required:[true, 'Please enter a email'],
        unique: [true, 'Email address already exists']
    },
    password:{
        type: String,
        required:[true, 'Please enter a password'],
        minlength: [6, 'Password must be at least 6 characters']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);