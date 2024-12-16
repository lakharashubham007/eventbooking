const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
   
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: Number,
      unique: true,
      require:true,
      
    },
    address: {
      type: String,
      trim: true,
      require:true
    },
    city: {
      type: String,
      trim: true,
      require:true
    },
    state: {
      type: String,
      trim: true,
      require:true
    },
    zipcode: {
      type: Number,
      trim: true,
      require:true
    },
    
    firebasetoken: String,
    remembertoken: String,
   
    profile_picture: {
      type: String,
      trim: true,
      require:true
    },
    
    is_active: {
      type: Boolean,
      default: true,
    },
   
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
