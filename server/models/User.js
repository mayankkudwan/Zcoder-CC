const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// problemSchema coming from the problems.js file
const problemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
      contestId: {
      type: Number,
      required: true,
    },
    index: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  });
  
  const User = mongoose.model('User', userSchema);
  const Problem = mongoose.model('Problem', problemSchema);
  module.exports = { User, Problem };
