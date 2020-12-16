const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
    },

    author: {
        type: ObjectId,
        ref: 'User'
    },

    likes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],

    createdOn: {
        type: Date,
        default: Date.now,
    },

    post: {
        type: ObjectId,
        ref: 'Post'
    }

});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;