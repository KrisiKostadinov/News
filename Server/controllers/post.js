const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
    get: {
        async all(req, res) {
            const posts = await Post.find({})
                .populate('author')
                .populate('category');
                
            console.log(posts);
            res.json(posts);
        },

        async byId(req, res) {
            const post = await Post.findById(req.params.id)
                .populate('author')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'author'
                    }
                }).populate('category');

            res.json(post);
        },

        async edit(req, res) {
            const post = await Post.findById(req.params.id);
            res.json(post);
        }
    },

    post: {
        async add(req, res) {
            const post = await Post.create(req.body);
            res.json({ post });
        },

        async edit(req, res) {
            const post = await Post.findByIdAndUpdate(req.params.id, { ...req.body });
            res.json(post);
        },

        async like(req, res) {
            const post = await Post.updateOne({ _id: req.params.id },
                {
                    $addToSet: { likes: req.body.userId }
                });

            res.json(post);
        },

        async dislike(req, res) {
            const post = await Post.updateOne({ _id: req.params.id },
                {
                    $pull: { likes: req.body.userId }
                });

            res.json(post);
        }
    },

    delete: {
        async byId(req, res) {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).send();
        },

        async allComments(req, res) {
            console.log(req.params.postId);
            await Post.updateOne({ _id: req.params.postId }, {
                $set: { comments: [] }
            });

            await Comment.deleteMany({ post: req.params.postId });
        }
    }
}