const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('<b> Admin Page </b>')
})

module.exports = router;