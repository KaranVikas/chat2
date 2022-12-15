// usermodel
//conatin name, email, password, picture

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=",
    },
  },
  {
    timestamps: true,
  }
);

// password comparing 
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// pre means before saving -> add a function
// next -> middleware 
userSchema.pre('save', async function(next){
    // if not modified move to next
    if(!this.isModified){
        next()
    }
    // generate a new password
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);    

})

const User = mongoose.model("User", userSchema);

module.exports = User;