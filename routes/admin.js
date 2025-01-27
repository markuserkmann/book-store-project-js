const express = require('express')
const router = express.Router()
const path = require('path')
const ProductController = require('../controllers/productController.js');
const db = require(path.resolve(__dirname, '../util/db'));

router.get('/adminproducts', (req, res, next) => {
    ProductController.LoadAdminPage(res)
})

router.post('/adminproductchange', (req, res, next) => {
    let ID = req.body.id
    let image_url = req.body.url
    let description = req.body.description
    let title = req.body.title
    let price = req.body.price
    ProductController.UpdateProduct(res, { ID, title, price, description, image_url });
});

module.exports = router;