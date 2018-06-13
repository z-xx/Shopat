var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('adddrinks', { title: 'Shopat' });
});

router.post('/', function(req, res, next) {
  console.log(req.body.dname);
  console.log(req.body.dorigin);
  console.log(req.body.ddes);
  res.render('adddrinks', { title: 'Shopat' });
});
module.exports = router;