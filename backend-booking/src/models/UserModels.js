const mongoose = require('mongoose')
const userModel = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: String, default: 'user', required: true },
    phone: { type: Number }
  },
  {
    timestamps: true
  }
)
const User = mongoose.model('User', userModel)
module.exports = User
