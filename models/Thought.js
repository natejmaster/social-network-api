const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => {
          return new Date(createdAt).toLocaleString();
        }
      },
    username: { type: String, required: true },
    reactions: [ reactionSchema ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
//reactionCount virtual to retrieve the length of the thought's reaction array field on query
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });
// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;