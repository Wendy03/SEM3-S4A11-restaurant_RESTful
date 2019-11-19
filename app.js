const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const port = 3000

const app = express()

// setting static files
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 method-override
app.use(methodOverride('_method'))

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })
const db = mongoose.connection

//連線異常
db.on('error', () => {
  console.log('Mongodb Error!')
})

//連線成功
db.once('open', () => {
  console.log('Mongodb Connected!')
})

// 載入 restaurant model
const Restaurant = require('./models/restaurant')

// 載入路由器
app.use('/', require('./routes/home'))
app.use('/', require('./routes/search'))
app.use('/restaurants', require('./routes/restaurant'))

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
