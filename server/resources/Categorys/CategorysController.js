var db = require('../../db');
var Categorys = require('./Categorys');

exports.add = function(req,res){
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
          res.send({success: true, message: 'Success'});
        });
      }
	})
}

exports.retriveAll = function(req,res){
  Categorys.find({},function(err,category){
    if(err) return res.send(err);
    res.send(category)
  })
} 