const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
    // validate using mongoose
  },
  thoughts: [],
  friends: []
});

//***Create a virtual called friendCount that retrieves the
//length of the user's friends array field on query.

const User = model('User', UserSchema);

module.exports = User;
