// Create web server with express
// Listen on port 3000
// Use body-parser middleware
// Use express-session middleware
// Use express-handlebars middleware
// Use passport middleware
// Use flash middleware
// Use method-override middleware
// Use connect-flash middleware
// Use routes
// Connect to mongoDB
// Start and listen on the Express server

// Include packages and define server related variables
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const passport = require('passport')
const db = require('./models')
const Comment = db.Comment
const Restaurant = db.Restaurant
const User = db.User
const bcrypt = require('bcryptjs')

// Include routes
const routes = require('./routes')
const api = require('./routes/api')

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// Use method-override
app.use(methodOverride('_method'))

// Use express-session
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))

// Use passport
app.use(passport.initialize())
app.use(passport.session())

// Use flash
app.use(flash())

// Setting local variables
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated() // passport.js
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// Use routes
app.use('/', routes)
app.use('/api', api)

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Setting static files
app.use(express.static('public'))

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
