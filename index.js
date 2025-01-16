const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const db = require('./util/db')

app.use(express.static(path.join(__dirname, 'public')))

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(bodyParser.urlencoded({ extended: true}))

app.use((req, res, next) => {
    res.status(404).send('<b>Page not found!</b>')
});  

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

db.execute('SHOW DATABASES')
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })