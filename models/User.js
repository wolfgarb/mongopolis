const { Schema, model } = require('mongoose');

const UserSchema = new Schema({});

// username
// -string
// -unique
// -required
// -trimmed

// email
// -string
// -unique
// -required
// -validate using mongoose

// thoughts
// -array of id values referencing thought model

// friends
// -array of id values referencing the User model (self-ref)

//***Create a virtual called friendCount that retrieves the
//length of the user's friends array field on query.

const User = model('User', UserSchema);

module.exports = User;
