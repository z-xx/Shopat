var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/drinks', function(req, res, next) {
  res.render('drinks', { title: 'Shopat' });
});

module.exports = router;