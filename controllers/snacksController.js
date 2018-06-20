'use strict';
const Snacks = require( '../models/snacks' );
console.log("loading the snacks Controller")


exports.getAllSnacks = ( req, res ) => {

    Snacks.find( {} )
      .exec()
      .then( ( Snacks ) => {
        res.render( 'Snacks', {
          snacks: snacks
        } );
      } )
      .catch( ( error ) => {
        console.log( error.message );
        return [];
      } )
      .then( () => {
        console.log( 'Snacks form get' );
      } );
  };

exports.saveSnacks = ( req, res ) => {
  console.log("in update snacks form!")
  console.dir(req)
  let newSnacks = new Snacks( {
    sname: req.body.sname,
    sdes: req.body.sdes,
    sorigin: req.body.sorigin,
    sprice: req.body.sprice
  } )

  console.log("Snacks = "+newSnacks)

  newSnacks.save()
    .then( () => {
      res.redirect( '/snacks' );
    } )
    .catch( error => {
      res.send( error );
    } );
};