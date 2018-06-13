var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addsnacks', { title: 'Shopat' });
});

router.post('/', function(req, res, next) {
  console.log(req.body.snname);
  console.log(req.body.snorigin);
  console.log(req.body.sndes);
  res.render('addsnacks', { title: 'Shopat' });
});
module.exports = router;