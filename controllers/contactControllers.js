const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// Get all contacts GET request
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

// Create a new contact using POST request
const createContact = asyncHandler(async (req, res) => {
    console.log("request is here", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
});

// Update a contact with specified contactID using PUT request
const updateContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update contact");
    }
    const updateContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,{
        new: true,
    })
    res.status(200).json(updateContact);
});

// Get a single contact using ID (accessed using :contactId) GET request
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `get contact ${req.params.id}`
    });
});

// Delete a contact with specified contactID using DELETE request
const deleteContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user don't have permission to delete contact");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({
        message: `delete contact ${contact}`

    });
});

module.exports = {
    getContacts,
    createContact,
    updateContact,
    getContact,
    deleteContact
};
