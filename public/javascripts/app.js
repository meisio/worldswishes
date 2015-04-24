/**
 * App JS File
 * 
 * @class App
 * @author Eugen Meissner (meisio)
 * @mail hello ( at ) meis.io
 */

// global module
var app = angular.module('App',[]);

// twish service
app.factory('TwishService',function($http){
	
	var lang = navigator.language || navigator.userLanguage; 

	return {
		/**
		 * This method fetches the last n twishes ( twitter wishes ) after a given twitter id from the server.
		 * If before is set to true, then the last n twishes before a given twitter id are fetched from the server.
		 *
		 * @method get
		 * @param {String} twitterId Twitter ID
		 * @param {Number} n Number of twishes to fetch
		 * @param {Boolean} before Flag to fetch twishes newer then the given id.
		 */
		get: function(twitterId,n,before){
			// return promise
			return $http
					.get('/twish',{
						twitterId: twitterId,
						n: n,
						before: before?before:false,
						setLang: lang
					})
					.then(function(result){
						return result.data;
					});
		}
	}
});

app.controller('TwishController',function($scope, TwishService){
	TwishService.get(-1,10).then(function(tweets){
		$scope.tweets = tweets;
	});

	$(".element").typed({
		strings: ["First sentence.", "Second sentence."],
        loop: true
	});
});