const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports = {
    post: {
        async add(req, res) {
            const comment = await Comment.create({ ...req.body });
            await Post.updateOne({ _id: req.body.post }, {
                $addToSet: { comments: comment._id }
            });

            res.json(comment);
        },

        async edit(req, res) {
            const comment = await Comment.updateOne({ _id: req.params.id }, {
                $set: { content: req.body.content }
            });

            res.json(comment);
        },

        async like(req, res) {
            const comment = await Comment.updateOne({ _id: req.params.id }, {
                $addToSet: { likes: req.body.userId }
            });
            
            res.send(comment);
        }
    },

    delete: {
        async byId(req, res) {
            const deletedComment = await Comment.deleteOne({ _id: req.params.id });
            res.json(deletedComment);
        },

        async dislike(req, res) {
            const comment = await Comment.updateOne({ _id: req.params.id }, {
                $pull: { likes: req.body.userId }
            });

            res.send(comment);
        }
    }
}