const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel'); 
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async(req,res) =>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc create New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async(req,res) =>{
    console.log("The content in the body",req.body)
    const {Name,Email,Phone}=req.body;
    if(!Name || !Email || !Phone){
        res.status(400)
        throw new Error("Please provide all the details");
    }
    const contact = await Contact.create({
        Name,
        Email,
        Phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
})

//@desc Get a single contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not Found");
    }
    res.status(200).json(contact); //req.params.id is the id of the contact we want to get
})

//@desc Update a single contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not Found");
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(401)
        throw new Error ('You do not have permission to update other contacts')
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact);
})

//@desc Delete a single contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not Found");
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(401)
        throw new Error ('You do not have permission to delete other contacts')
    }
    await Contact.deleteOne(contact);
    res.status(200).json(contact);
})
module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};