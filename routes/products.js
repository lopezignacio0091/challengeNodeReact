const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

//@route GET api/product
//@desc get all product 
//@access Private
router.get('/', auth, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
    //    res.send('get all products user');
});

//@route POST api/product
//@desc add new 
//@access Private
//REMARK: aca se pasan dos middlewares
router.post('/', [auth, [check('name', 'name is required').not().isEmpty(),]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, stock , price} = req.body;

    try {
        const newProduct = new Product({name,stock,price});

        //guardamos el product en la base
        const product = await newProduct.save();

        res.json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

//@route PUT api/product/:id
//@desc update product 
//@access Private
router.put('/:id', auth, async (req, res) => {
    const { name, stock , price} = req.body;

    // build product object
    const productFields = {};
    if (name) productFields.name = name;
    if (stock) productFields.stock = stock;
    if (price) productFields.price = price;

    try {
        //INFO: de esta forma se puede consutlar los params de la copnsuilta
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(400).json({ msg: 'Product not found' });


        //INFO: buscamos el product por id y le seteamos productfields si no existe lo creamos
        product = await Product.findByIdAndUpdate(req.params.id, { $set: productFields }, { new: true });
        res.json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }

});

//@route DELETE api/products/:id
//@desc delete product
//@access Private
router.delete('/:id', auth, async (req, res) => {

    try {
        //INFO: de esta forma se puede consutlar los params de la copnsuilta
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(400).json({ msg: 'Product not found' });

        //INFO: buscamos el producto por id y le seteamos productfields si no existe lo creamos
        await Product.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Product remove' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;