const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: "thought"
    },
  ],

    friends : [
      {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
    ],
    },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
