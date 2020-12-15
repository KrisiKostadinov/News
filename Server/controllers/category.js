const Category = require("../models/Category");

module.exports = {
    get: {
        async all(req, res) {
            const categories = await Category.find({ });
            res.json(categories);
        },

        async byId(req, res) {
            const category = await Category.findById(req.params.id);
            res.json(category);
        },

        async edit(req, res) {
            const category = await Category.findById(req.params.id);
            res.json(category);
        }
    },

    post: {
        async add(req, res) {
            const category = await Category.create({ ...req.body });
            res.json({ category });
        },

        async edit(req, res) {
            const category = await Category.findByIdAndUpdate(req.params.id, { ...req.body });
            res.json(category);
        }
    },

    delete: {
        async byId(req, res) {
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).send();
        }
    }
}