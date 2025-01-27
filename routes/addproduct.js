const express = require('express')
const router = express.Router()
const path = require('path')
const db = require(path.resolve(__dirname, '../util/db'))
const ProductController = require('../controllers/productController.js');

router.get('/addproduct', async(req, res, next) => {
    res.render('addproduct')
})

router.post('/addproductpost', (req, res, next) => {
    ProductController.addProduct(req.body)
    res.render('addproduct')
})

module.exports = router;