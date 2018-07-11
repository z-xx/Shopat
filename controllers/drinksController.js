'use strict';
const Drinks = require( '../models/drinks' );
console.log("loading the drinks Controller")


exports.getAllDrinks = ( req, res ) => {

    Drinks.find( {} )
      .exec()
      .then( ( drinks ) => {
        res.render( 'drinks', {
          drinks: drinks
        } );
      } )
      .catch( ( error ) => {
        console.log( error.message );
        return [];
      } )
      .then( () => {
        console.log( 'Drinks form get' );
      } );
  };

exports.saveDrinks = ( req, res ) => {
  console.log("in update drinks form!")
  console.dir(req)
  let newDrinks = new Drinks( {
    dname: req.body.dname,
    ddes: req.body.ddes,
    dorigin: req.body.dorigin,
    dprice: req.body.dprice
  } )

  console.log("drinks = "+newDrinks)

  newDrinks.save()
    .then( () => {
      res.redirect( '/drinks' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

// exports.deleteDrinks = (req, res) => {
//   console.log("in deleteDrinks")
//   let drinksName = req.body.deleteName
//   if (typeof(drinksName)=='string') {
//       Skill.deleteOne({name:drinksName})
//            .exec()
//            .then(()=>{res.redirect('/drinks')})
//            .catch((error)=>{res.send(error)})
//   } else if (typeof(drinksName)=='object'){
//       Skill.deleteMany({name:{$in:drinksName}})
//            .exec()
//            .then(()=>{res.redirect('/drinks')})
//            .catch((error)=>{res.send(error)})
//   } else if (typeof(drinksName)=='undefined'){
//       console.log("This is if they didn't select")
//       res.redirect('/drinks')
//   } else {
//     console.log("This shouldn't happen!")
//     res.send(`unknown drinkName: ${drinksName}`)
//   }

// };
exports.getDdes = ( req, res ) => {
  const objId = new mongo.ObjectId(req.params.id)
  Drinks.findOne({"_id": objID}) 
    .exec()
    .then( ( drinks ) => {
      res.render( 'drinks', {
        drinks: drinks
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'getDdes complete' );
    } );
};

exports.attachDdes = ( req, res, next ) => {
  console.log('in attachDdes')
  const objId = new mongo.ObjectId(req.params.id)
  Drinks.findOne(objId) //{"_id": objId})
    .exec()
    .then( ( drinks ) => {
      res.locals.drinks = drinks
      next()
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'attachDdes complete' );
    } );
};
