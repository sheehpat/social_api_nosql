const { Schema, model } = require('mongoose');
const friendSchema = require('./Friend');


//ADD VALIDATION FOR THE EMAIL

//UDPATE THIS MODEL

// Schema to create User model
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    friends: [friendSchema],
    friendCount: {
//ADD TO THIS SCHEMA
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
