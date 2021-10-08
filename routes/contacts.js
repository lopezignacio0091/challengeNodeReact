const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

//@route GET api/contacts
//@desc get all users contacts
//@access Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
    //    res.send('get all contacts user');
});

//@route POST api/contacts
//@desc add new 
//@access Private
//REMARK: aca se pasan dos middlewares
router.post('/', [auth, [check('name', 'name is required').not().isEmpty(),]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({ name, email, phone, type, user: req.user.id });

        //guardamos el contacto en la base
        const contact = await newContact.save();

        res.json(contact);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

//@route PUT api/contacts/:id
//@desc update contact 
//@access Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    // build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        //INFO: de esta forma se puede consutlar los params de la copnsuilta
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(400).json({ msg: 'Contact not found' });

        //WARNING: asegurarse que el uyser tenga contacts
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'not authorized' });
        }

        //INFO: buscamos el contacto por id y le seteamos contactfields si no existe lo creamos
        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });

        res.json(contact);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }

});

//@route DELETE api/contacts/:id
//@desc delete contact 
//@access Private
router.delete('/:id', auth, async (req, res) => {

    try {
        //INFO: de esta forma se puede consutlar los params de la copnsuilta
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(400).json({ msg: 'Contact not found' });

        //WARNING: asegurarse que el uyser tenga contacts
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'not authorized' });
        }

        //INFO: buscamos el contacto por id y le seteamos contactfields si no existe lo creamos

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact remove' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;