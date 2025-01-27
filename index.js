const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const cartRoute = require('./routes/cart')
const addProductRoute = require('./routes/addproduct')

app.use(adminRoutes)
app.use(shopRoutes)
app.use(cartRoute)
app.use(addProductRoute)

app.use((req, res, next) => {
    res.render('error')
});  

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
