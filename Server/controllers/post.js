const Post = require("../models/Post");

module.exports = {
    get: {
        async all(req, res) {
            const posts = await Post.find({}).populate('author');
            console.log(posts);
            res.json(posts);
        },

        async byId(req, res) {
            const post = await Post.findById(req.params.id)
                .populate('author')
                .populate('likes');

            res.json(post);
        },

        async edit(req, res) {
            const post = await Post.findById(req.params.id);
            res.json(post);
        }
    },

    post: {
        async add(req, res) {
            console.log(req.body);
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
        }
    },

    delete: {
        async byId(req, res) {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).send();
        }
    }
}