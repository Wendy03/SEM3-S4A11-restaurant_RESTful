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

// sort restaurant
router.get('/name-asc', (req, res) => {
  Restaurant.find({})
    .sort({ name_en: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { style: 'index.css', restaurants })
    })
})

router.get('/name-desc', (req, res) => {
  Restaurant.find({})
    .sort({ name_en: 'desc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { style: 'index.css', restaurants })
    })
})

router.get('/category-asc', (req, res) => {
  Restaurant.find({})
    .sort({ category: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { style: 'index.css', restaurants })
    })
})

router.get('/rating-asc', (req, res) => {
  Restaurant.find({})
    .sort({ rating: -1 })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { style: 'index.css', restaurants })
    })
})

router.get('/rating-desc', (req, res) => {
  Restaurant.find({})
    .sort({ rating: 1 })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { style: 'index.css', restaurants })
    })
})

router.get('/location-asc', (req, res) => {
  Restaurant.find({})
    .sort({ location: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { style: 'index.css', restaurants })
    })
})




module.exports = router