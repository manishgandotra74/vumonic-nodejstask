const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  tag_name: { type: String, required: true },
  topic: { type: Number, required: true },
});

module.exports = mongoose.model('Topic', postSchema);
