var db = require('../../db');
var Categorys = require('./Categorys');

exports.add = function(req,res){
  if (req.session.role !== 'Admin') {
    return res.send({allow:false, message: 'You are not Authorize to access'})
  } else {
    Categorys.findOne({categoryName: req.body.categoryName})
    	.exec(function (err, category) {
  	  if (err) {
          console.error(err);
  	  }
        if (category) { // if category exist, return message 
        	console.log(category)
          res.send({success: false, message: 'category already exist'});
        } else { // else create new catergory and return success response
          var newCategory = new Categorys(req.body);
          newCategory.save(function(err){
            if (err) console.log(err);
            res.send({allow: true, message: 'Success'});
          });
        }
  	})
  }
}

exports.retriveAll = function(req,res){
  Categorys.find({},function(err,category){
    if(err) return res.send(err);
    res.send(category)
  })
} 