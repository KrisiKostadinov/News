const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
    },

    categoryId: {
        type: ObjectId,
        ref: 'Category'
    },

    imageUrl: {
        type: String,
    },

    author: {
        type: ObjectId,
        ref: 'User'
    },

    createdOn: {
        type: Date,
        default: Date.now,
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;