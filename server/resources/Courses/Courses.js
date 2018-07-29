var mongoose = require('mongoose');

var CoursesSchema = mongoose.Schema({
  courseName:{ type:String, required:true },
  dateOfCreation:{ type:Date, required:true, default: Date.now },
  dateOfStart:{ type:Date, required:true },
  description:{ type:String, required:true },
  category:{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorys' },
  userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
})

var Courses = mongoose.model('Courses',CoursesSchema);

module.exports = Courses;