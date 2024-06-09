const { Schema, model } = require('mongoose');

//UPDATE THIS MODEL
//UPDATE THIS MODEL

//UPDATE THIS MODEL

//UPDATE THIS MODEL


// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    thoughtText: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
