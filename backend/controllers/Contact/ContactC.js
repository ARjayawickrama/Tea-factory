const Contact = require("../../model/Contact/ContactM");


const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        if (contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found." });
        }
        return res.status(200).json({ contacts });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve contacts." });
    }
};


const getContactById = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found." });
        }
        return res.status(200).json({ contact });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve contact." });
    }
};

const addContact = async (req, res, next) => {
    const { name, email, message } = req.body;
    
    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        
        return res.status(200).json({ newContact });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add contact." });
    }
};

module.exports = {
    getContacts,
    getContactById,
    addContact,
};
