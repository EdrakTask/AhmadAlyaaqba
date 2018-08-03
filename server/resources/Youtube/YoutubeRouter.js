var YoutubeRouter = require('express').Router()
var YoutubeController = require('./YoutubeController');

YoutubeRouter.route('/')
	.post(function(req, res) {
	  YoutubeController.upload(req, res);
	})

module.exports=YoutubeRouter;