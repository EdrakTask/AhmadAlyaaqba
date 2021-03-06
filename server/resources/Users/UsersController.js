var db = require('../../db');
var Users = require('./Users');

exports.login = function(req,res){
  Users.findOne({userName: req.body.userName})
  .exec(function (err, user) {
    if (err) {
      console.error(err);
    } 
    if (!user) { // Handle wrong user name
      res.send({success: false, message: 'User Not found'})
    } else { // when find user check password by calling method comparePassword
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) {
          console.error(err);
        }
        if (!isMatch) { // password not match case
          res.send({success: false, message: 'Password Wrong'})
        } else { // if match, go and generate seassion
          return req.session.regenerate(function(err) {
            if (err) {
              return console.error(err);
            }
            req.session.username = user.userName; // save user name yo be used when needed in frontend
            req.session.role = user.Role; // user role to check if user or admin
            req.session._id = user._id;
            res.send({success: true, user: user})
          });
        }
      });
    }
  });
}

// New user registeration
exports.create = function(req,res){
  Users.findOne({userName: req.body.userName})
    .exec(function (err, user) {
      if (err) {
        console.error(err);
      }
      if (user) { // if user exist, return error
        res.send({success: false, message: 'Username Exist, please Change username'});
      } else {
        var user = new Users(req.body);
        user.save(function (err) {
          if (err) console.log(err);
          res.send({success: true, message: 'Success'});
        });
      }
    });
}

// Logout function 
exports.logout = function (req, res) {
  req.session.destroy(function(err) {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  })
}

// Check login if admin
exports.isAdmin = function(req, res) {
  if (req.session.role === "Admin") {
    res.json(true);
  } else {
    res.status(401);
    res.json(false);
  }
}

exports.isLogin = function(req, res) {
  if (req.session.username !== undefined) {
    res.json(true);
  } else {
    res.json(false);
  }
}
//to take the user information once logeddin 
exports.getLoginData = function(req, res) {
  Users.findOne({userName: req.session.username}).
  populate({
      path:'Courses',
      populate: {
        path: "category",
      }
    }).
  exec(function(err, user) {
    if (err) {
      console.error(err);
    }
    if (!user) {
      res.send({success: false, message: 'User Not found'})
    } else {
      res.send({success: true, user: user})
    }
  })
}