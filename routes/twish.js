/**
 * 
 * @class 	Twish
 * @author 	Eugen Meissner (meisio)
 * @mail	hello ( at ) meis.io
 */


// external modules
var express = require('express');
var Twit 	= require('twit');

// local modules
var $S 	= require('../modules/settings.js');

// 'constants'
var MAX_TWISHES = 10;

// members
var router = express.Router();

var T = new Twit($S.getTwitterAuth());

/* GET home page. */
router.get('/', function(req, res, next) {
	var twitterId 	= req.query.twitterId;

	var count 		= (   req.query.count && ( req.query.count <= MAX_TWISHES ) )
						? req.query.count
						: MAX_TWISHES;

	var before 		= 	  req.query.before 
						? req.query.before
						: false;

	if( twitterId ){

		// access i18n
		var i18n = req.i18n;
		console.log(i18n.translate('app.iwish'));
		var query = {};
		query.q = i18n.translate('app.iwish');
		query.result_type = 'recent';
		query.count = count;

		switch(before){
			case true: 	query.maxid   = twitterId; break;
			case false: query.sinceid = twitterId; break;
		}
		
		T.get('search/tweets', query, function(twitterErr, twitterRes) {
			if( twitterErr ) {
				// handle error case
				res
				.status(500)
				.send({
					message: 'Oops... Something went wrong.'
				});
			} else {
				// handle no error and check if we got some results
				var tweets = 	twitterRes.statuses
							 ?	twitterRes.statuses
							 : 	[];

				res.send(twitterRes.statuses);
			}

		});

	} else {

		res
		.status(400)
		.send({
			message: 'Missing parameters: ' + (twitterId?'':'Twitter Id not provided! ')
		});

	}
});

module.exports = router;
