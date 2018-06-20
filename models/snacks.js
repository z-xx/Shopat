'use strict';
const mongoose = require ('mongoose');

var snacksSchema = mongoose.Schema( {
    sname: String,
    sprice: String,
    sorigin: String,
    sdes: String,
    //sphoto: File,
  } );
  
  module.exports = mongoose.model( 'snacks', snacksSchema );
  