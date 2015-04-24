/**
 * 
 * @class 	Index
 * @author 	Eugen Meissner (meisio)
 * @mail	hello ( at ) meis.io
 */

// external modules
var express = require('express');

// local modules

// members
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twish' });
});

module.exports = router;
