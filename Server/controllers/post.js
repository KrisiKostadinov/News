const Post = require("../models/Post");

module.exports = {
    get: {
        async all(req, res) {
            const posts = await Post.find({ });
            res.json(posts);
        },

        async byId(req, res) {
            const post = await Post.findById(req.params.id);
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
        }
    },

    delete: {
        async byId(req, res) {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).send();
        }
    }
}