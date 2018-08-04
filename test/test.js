var Course = require('../server/resources/Courses/Courses');
var Category = require('../server/resources/Categorys/Categorys');
var User = require('../server/resources/Users/Users');
var express = require('express');  
// const lowdb = require('lowdb');
var wagner = require('wagner-core');
var mongoose = require('mongoose');
var lowdb = require('lowdb');
var supertest = require('supertest');  
var chai = require('chai');  
var uuid = require('uuid');  
var app = require('../server/server.js');
global.app = app;  
global.uuid = uuid;  
global.expect = chai.expect;  
global.request = supertest(app); 




//Courses 
describe('Courses Model', function () {
  
  it('should be a Mongoose model', function () {
    expect(new Course()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(Course.schema).to.exist;
  });  

  it('saves a new course', function(done) {
    request.post('/api/course')
      .send({
        title: 'run',
        done: false
      })
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('returns a list of course', function(done) {
    request.get('/api/course')
    .expect(200)
    .end(function(err, res) {
      expect(res.body).to.be.an('array').that.not.equal(0);      
      done(err);
    });
  });

})

//Users
describe('Users Model', function () {
    
  it('should be a Mongoose model', function () {
    expect(new User()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(User.schema).to.exist;
  });  
  it('saves a new user', function(done) {
    request.post('/api/user/create')
      .send({
        title: 'run',
        done: false
      })
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });


  it('returns a list of user', function(done) {
    request.get('/api/user')
    .expect(200)
    .end(function(err, res) {
      expect(res.body).to.be.an('object').that.not.equal(0);
      done(err);
    });
  });


})

//Categorys
describe('Categorys Model', function () {

        
  it('should be a Mongoose model', function () {
    expect(new Category()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(Category.schema).to.exist;
  });  

  it('saves a new category', function(done) {
    request.post('/api/category')
      .send({
        title: 'run',
        done: false
      })
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('returns a list of category', function(done) {
    request.get('/api/category')
    .expect(200)
    .end(function(err, res) {
      expect(res.body).to.be.an('array').that.not.equal(0);
      done(err);
    });
  });
})

