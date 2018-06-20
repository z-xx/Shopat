var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var shoppingRouter = require('./routes/shopping');
var drinksRouter = require('./routes/drinks');
var snacksRouter = require('./routes/snacks');
var adddrinksRouter = require('./routes/adddrinks');
var addsnacksRouter = require('./routes/addsnacks');
var drinksController = require('./controllers/drinksController');
var snacksController = require('./controllers/snacksController');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shopping', shoppingRouter);
app.use('/login', loginRouter);



//app.use('/drinks', drinksRouter);
app.get('/adddrinks', function(req,res){
  console.log("adding the drinks")
  res.render('adddrinks',{})
});
app.post('/adddrinks',drinksController.saveDrinks)
app.use('/addsnacks', addsnacksRouter);
app.get('/drinks', drinksController.getAllDrinks );

//app.use('/snacks', snacksRouter);
app.get('/addsnacks', function(req,res){
  console.log("adding the snacks")
  res.render('addsnacks',{})
});
app.post('/addsnacks', snacksController.saveSnacks)
app.use('/addsnacks', addsnacksRouter);
app.get('/snacks', snacksController.getAllSnacks );


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
