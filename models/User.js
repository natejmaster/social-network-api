const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, validate: {
        validator: function (value) {
          // Use a regular expression to validate the email format
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }],
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
//friendCount virtual to retrieve the length of the user's friends array field on query
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });
// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
