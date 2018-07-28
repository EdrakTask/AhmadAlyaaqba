var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UsersSchema = mongoose.Schema({
  userName: { type:String, required:true, unique:true },
  password: { type:String, required:true },
  Role: { type: String, trim: true, required: true, enum: ['User', 'Admin'], default: 'User' },
  personalImgUrl : {type: String },
  gender: {type: String, required: true},
  Courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }]
}, { usePushEach: true });

UsersSchema.pre('save', function (next) {
  // defualt link for defualts users image profiles
  var maleImg = "https://cdn2.iconfinder.com/data/icons/avatar-profile/449/avatar_user_default_contact_profile_male-512.png";
  var femaleImg = "https://cdn2.iconfinder.com/data/icons/avatar-profile/429/contact_profile_user_default_avatar_female_suit-512.png";
  
  // if user didnt upload img, set defualt image depend on gender
  if (!this.personalImgUrl) {
    if (this.gender ==="Male") {
      this.personalImgUrl = maleImg;
    } else {
      this.personalImgUrl = femaleImg;
    }
  }

  //in case there changing and password didnt effect, do nothing after this
    if (!this.isModified('password')) {
      return next();
    } 
    var user = this
    bcrypt.hash(user.password,10,function(err,hash){
    if(err){
      return next(err)
    }
    user.password = hash;
    next();
  });
});

// method to check if password correct or not
UsersSchema.methods.comparePassword =function(password,fun){
  bcrypt.compare(password,this.password,function(err,isMatch){
    if(err){
      fun(err)
    }
    fun(null,isMatch)
  });
}

var Users = mongoose.model('Users',UsersSchema);

module.exports=Users;