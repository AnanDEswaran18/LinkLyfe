const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Name: {
        type: 'string',
        required: [true,'please add the contact name!']
    },
    Email: {
        type: 'string',
        required: [true,'please add the contact email!']
    },
    Phone: {
        type: 'string',
        required: [true,'please add the contact phone number!']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Contact', contactSchema);