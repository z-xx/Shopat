var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginSSRouter = require('./routes/loginSS');
var shoppingRouter = require('./routes/shopping');
var drinksRouter = require('./routes/drinks');
var snacksRouter = require('./routes/snacks');
var adddrinksRouter = require('./routes/adddrinks');
var addsnacksRouter = require('./routes/addsnacks');
var drinksController = require('./controllers/drinksController');
var snacksController = require('./controllers/snacksController');
var app = express();
var bodyParser = require("body-parser")
// var flash = require('connect-flash')

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require( './models/user' )
const session = require("express-session")
const passport = require('passport')
const configPassport = require('./config/passport')
configPassport(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shopping', shoppingRouter);
app.use('/loginSS', loginSSRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'zzbbyanana' }));
app.use(passport.initialize());
app.use(passport.session());

// here is where we check on their logged in status
app.use((req,res,next) => {
  res.locals.loggedIn = false
  if (req.isAuthenticated()){
    console.log("user has been Authenticated")
    res.locals.user = req.user
    res.locals.loggedIn = true
    if (req.user){
      if (req.user.googleemail=='zxx@brandeis.edu'){
        console.log("Owner has logged in")
        res.locals.status = 'admin'
      } else {
        console.log('customer has logged in')
        res.locals.status = 'customer'
      }
    }
  }
  next()
})

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/login/authorized',
        passport.authenticate('google', {
                successRedirect : '/',
                failureRedirect : '/loginerror'
        }));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  console.log("checking to see if they are authenticated!")
  // if user is authenticated in the session, carry on
  res.locals.loggedIn = false
  if (req.isAuthenticated()){
    console.log("user has been Authenticated")
    return next();
  } else {
    console.log("user has not been authenticated...")
    res.redirect('/login');
  }
}

app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/login', function(req,res){
  res.render('login',{})
})
// route for logging out
app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



//app.use('/drinks', drinksRouter);
app.get('/adddrinks', isLoggedIn, function(req,res){
  console.log("adding the drinks")
  res.render('adddrinks',{})
});
app.post('/adddrinks', isLoggedIn, drinksController.saveDrinks)
app.use('/addsnacks', isLoggedIn, addsnacksRouter);
app.get('/drinks', isLoggedIn, drinksController.getAllDrinks );

//app.use('/snacks', snacksRouter);
app.get('/addsnacks', isLoggedIn, function(req,res){
  console.log("adding the snacks")
  res.render('addsnacks',{})
});
app.post('/addsnacks', isLoggedIn, snacksController.saveSnacks)
app.use('/addsnacks', isLoggedIn, addsnacksRouter);
app.get('/snacks', isLoggedIn, snacksController.getAllSnacks );


const
mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/shopat' );
const 
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

