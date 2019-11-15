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
  Restaurant.find((err, restaurants) => {
    const keyword = req.query.keyword
    if (err) return console.error(err)
    const searchResult = restaurants.filter(restaurant => {
      return (
        restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      )
    })
    const emptyDate = searchResult.length === 0 ? true : false

    res.render('index', { style: 'index.css', restaurants: searchResult, keyword, emptyDate })
  })
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