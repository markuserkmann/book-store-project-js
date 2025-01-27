const express = require('express')
const router = express.Router()
const path = require('path')
const ProductController = require('../controllers/productController.js');
const db = require(path.resolve(__dirname, '../util/db'));


router.get('/shop', (req, res, next) => {
    ProductController.FetchProducts(res)
})

module.exports = router;