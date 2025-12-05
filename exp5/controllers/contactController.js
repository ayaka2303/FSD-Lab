const Contact = require("../model/contactModel");

const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    } catch (error) {
        console.log(error);
    }
};

const createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const contact = await Contact.create({ name, email, phone });
        res.status(201).json(contact);
    } catch (error) {
        console.log(error);
    }
};

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedContact);
    } catch (error) {
        console.log(error);
    }
};

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json(contact);

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getContact,
    createContact,
    updateContact,
    deleteContact,
};
