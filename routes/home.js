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
  let sortName
  switch (req.params.filter) {
    case 'name-asc':
      sort = { name_en: 'asc' }
      sortName = '店名:A-Z'
      break;
    case 'name-desc':
      sort = { name_en: 'desc' }
      sortName = '店名:Z-A'
      break;
    case 'category-asc':
      sort = { category: 'asc' }
      sortName = '類別:A-Z'
      break;
    case 'rating-asc':
      sort = { rating: -1 }
      sortName = '評分:高-低'
      break;
    case 'rating-desc':
      sort = { rating: 1 }
      sortName = '評分:低-高'
      break;
    case 'location-asc':
      sort = { location: 'asc' }
      sortName = '地址:A-Z'
      break;
  }
  Restaurant.find({})
    .sort(sort)
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { style: 'index.css', restaurants, sortName })
    })
})


module.exports = router