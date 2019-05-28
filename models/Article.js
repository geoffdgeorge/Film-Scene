const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  siteURL: {
    type: String,
    required: true,
  },
  linkURL: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  notes: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: 'Note',
    },
  ],
});

const User = mongoose.model('article', articleSchema);

module.exports = User;
