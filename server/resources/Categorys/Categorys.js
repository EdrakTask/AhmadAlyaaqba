var mongoose = require('mongoose');
 
var CategorysSchema = mongoose.Schema({
  categoryName:{ type:String, unique:true },
  color:{ type:String, unique:true } // for card background color
})

var Categorys = mongoose.model('Categorys',CategorysSchema);

module.exports = Categorys;