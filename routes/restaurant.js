const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 列出全部 Restaurant
router.get('/', (req, res) => {
  return res.redirect('/')
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
    res.render('index', { style: 'index.css', restaurants: searchResult, keyword })
  })
})

// sort restaurant
router.get('/sort/:filter', (req, res) => {
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

// 新增一筆 restaurant 頁面
router.get('/new', (req, res) => {
  return res.render('new', { style: 'form.css' })
})

// 新增一筆restaurant
router.post('/', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
  // 存入資料庫
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 顯示一筆 Restaurant 的詳細內容
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { style: 'detail.css', restaurant })
  })
})

// 修改 Restaurant 頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { style: 'form.css', restaurant })
  })
})

// 修改 Restaurant
router.put('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    Object.assign(restaurant, req.body)
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// 刪除 Restaurant
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
