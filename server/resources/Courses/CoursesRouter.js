var CoursesRouter = require('express').Router();
var CoursesController = require('./CoursesController');

CoursesRouter.route('/')
  .post(function(req,res){
    CoursesController.add(req,res);
  })
  .delete(function(req,res){
    CoursesController.delete(req,res);
  })
  .put(function(req,res){
    CoursesController.update(req,res);
  })

CoursesRouter.route('/retrive')
  .post(function(req,res){
    CoursesController.retriveAll(req,res);
  })

CoursesRouter.route('/newest')
  .get(function(req, res) {
    CoursesController.retriveLastFive(req, res);
  })

CoursesRouter.route('/filterByCategory')
  .post(function(req, res) {
    CoursesController.retriveByCategory(req, res);
  })  

CoursesRouter.route('/:id')
  .get(function(req,res){
    CoursesController.retriveOne(req,res);
  })
  
module.exports = CoursesRouter;