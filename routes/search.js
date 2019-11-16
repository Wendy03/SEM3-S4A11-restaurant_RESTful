const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//Search Restaurant
router.get('/search', (req, res) => {
  const searchInput = req.query.keyword
  const regex = new RegExp(searchInput, 'i')
  Restaurant.find(
    {
      $or: [
        { name: regex },
        { name_en: regex },
        { category: regex }
      ]
    },
    (err, restaurants) => {
      if (err) return console.error(err)
      const isDataEmpty = restaurants.length === 0 ? true : false
      return res.render('index', { style: 'index.css', restaurants, keyword: req.query.keyword, isDataEmpty })
    }
  )
})

module.exports = router