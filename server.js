if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const methodOverride = require('method-override')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const app = express()

app.use(express.urlencoded({extended:true,limit:"10mb"}))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(methodOverride('_method'))
app.use(expressLayout)
app.use(express.static('public'))
app.use('/authors', authorsRouter)
app.use('/', indexRouter)
app.use('/books', bookRouter)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (err) => { console.error(err) })
db.once('open', () => { console.log('Connected to database') })

app.listen(process.env.PORT || 80, () => {
    console.log('http://127.0.0.1:80')
})