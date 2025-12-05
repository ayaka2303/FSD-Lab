const express = require("express");
const router = express.Router();

const {
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController');

router.get('/:id', getContact);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
