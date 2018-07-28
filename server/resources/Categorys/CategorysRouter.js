var CategorysRouter = require('express').Router();
var CategorysController = require('./CategorysController');

CategorysRouter.route('/')
	.post(function(req,res){
	    CategorysController.add(req,res);    
	})

CategorysRouter.route('/')
	.get(function(req,res){
	    CategorysController.retriveAll(req,res);
	})

module.exports = CategorysRouter;