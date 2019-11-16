const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// Restaurant 首頁
router.get('/', (_req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { style: 'index.css', restaurants })
  })
})

module.exports = router