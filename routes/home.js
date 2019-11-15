const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// Restaurant 首頁
router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { style: 'index.css', restaurants })
  })
})

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
      const emptyDate = restaurants.length === 0 ? true : false
      return res.render('index', { style: 'index.css', restaurants, keyword: req.query.keyword, emptyDate })
    }
  )
})

// sort restaurant
router.get('/:filter', (req, res) => {
  let sort
  switch (req.params.filter) {
    case 'name-asc':
      sort = { name_en: 'asc' }
      break;
    case 'name-desc':
      sort = { name_en: 'desc' }
      break;
    case 'category-asc':
      sort = { category: 'asc' }
      break;
    case 'rating-asc':
      sort = { rating: -1 }
      break;
    case 'rating-desc':
      sort = { rating: 1 }
      break;
    case 'location-asc':
      sort = { location: 'asc' }
      break;
  }
  Restaurant.find({})
    .sort(sort)
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { style: 'index.css', restaurants })
    })
})


module.exports = router