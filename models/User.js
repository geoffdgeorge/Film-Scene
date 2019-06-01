const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  thirdPartyId: {
    type: String,
    required: true,
  },
  comments: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Comment model
      ref: 'Comment',
    },
  ],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
