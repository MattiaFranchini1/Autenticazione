const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile_image_url: { type: String, required: true },
    registered_at: { type: Date, default: Date.now },
    teaching_review: {type: Number, default: 0.0},
    learning_review: {type: Number, default: 0.0},
    counter_hour_teaching:{type: Number, default: 0}, //?
    counter_hour_learning:{type: Number, default: 0}, //?
  });

const User = mongoose.model('User', userSchema);

module.exports = User;