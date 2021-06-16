if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 5689
const path = require('path')

const homeRouter = require('./routes/home')

app.set('view engine', 'ejs')
//To set the views folder which EJS will use to use res.render as it's by default
app.set('views', path.join(__dirname + '/views'))
//The idea behind the layout file is that every file is going to be put with the layout of the layout file to avoid duplications
app.set('layout', 'layouts/layout')
//So it uses the layouts library
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log(`Connected to Mongoose!`))

app.use('/', homeRouter)

app.listen(PORT, () => console.log(`Running server on port ${PORT}`))