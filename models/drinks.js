'use strict';
const mongoose = require ('mongoose');

var drinksSchema = mongoose.Schema( {
    dname: String,
    dprice: String,
    dorigin: String,
    ddes: String,
    //dphoto: File,
  } );
  
  module.exports = mongoose.model( 'drinks', drinksSchema );
  