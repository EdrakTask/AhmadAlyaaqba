var db = require('../../db');
var Courses = require('./Courses');
var Users = require('../Users/Users');

exports.add = function(req,res){
  Users.findOne({_id: req.session._id})
  .exec(function(err,user){
    if (err) return res.send(err);
    if (!user) { // Handle wrong user name
      res.send({success: false, message: 'User Not found'})
    } else {
      var newCourse = {
        courseName: req.body.courseName,
        dateOfStart: req.body.dateOfStart,
        description: req.body.description,
        category: req.body.category,
        userId: req.session._id
      }
      var course = new Courses(newCourse);
      course.save(function(err){
        if(err) res.send({sucess:false, message:err});
      })
      user.Courses.push(course._id);
      user.save(function(err,data){
        if (err) return res.send(err);
        res.send({sucess:true, message:'Course added successfully'});
      })
    }
  })
}

exports.retriveAll = function(req,res){
  Courses.find({}).
  populate({ path: 'userId', select: "fullName"}).
  populate('category').
  exec(function(err,course){
    if (err) return res.send(err);
    res.send(course)
  })
}

exports.delete = function(req,res){
  course.findOne({_id:req.body.id}).
  populate({ path: 'userId', select: "userName"}).
  exec(function (erro, course) {
    if (err) return res.send(err);
    if (course.userId.userName === req.session.username) {
      Courses.deleteOne({_id:req.body.id},function(err){
        if(err) return res.send(err);
        res.send({success: true, message:'Delete successfully'});
      })
    } else {
      res.status(401);
      res.send({success: false, message:'You can not delete this course'});
    }
  })
}

exports.retriveOne = function(req, res) {
  Courses.find({_id: req.params.id}).
  populate({ path: 'userId', select: "fullName"}).
  populate('category').
  exec(function(err,course){
    if (err) return res.send(err);
    res.send(course)
  })
}