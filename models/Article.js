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
  summary: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
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

const Article = mongoose.model('article', articleSchema);

module.exports = Article;
