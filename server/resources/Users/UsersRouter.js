var UsersRouter = require('express').Router()
var UsersController = require('./UsersController');

UsersRouter.route('/')
	.get(function(req, res) {
	  UsersController.getLoginData(req,res);
	})

UsersRouter.route('/create')
	.post(function(req, res) {
	  UsersController.create(req,res) 
	})

UsersRouter.route('/logout')
	.get(function(req, res) {
	  UsersController.logout(req,res) 
	})

UsersRouter.route('/login')
	.post(function(req, res) {
	  UsersController.login(req,res) 
	})

UsersRouter.route('/isAdmin')
	.get(function(req, res) {
		UsersController.isAdmin(req,res)
	})

UsersRouter.route('/isLogin')
	.get(function(req, res) {
		UsersController.isLogin(req,res)
	})

module.exports=UsersRouter;