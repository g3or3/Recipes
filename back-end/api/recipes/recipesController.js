const Recipes = require("./recipesModel");

const recipesController = {
	async getAll(req, res) {
		res.json(await Recipes.get());
	},

	async getById(req, res) {
		res.json(await Recipes.get(req.params.id));
	},

	async create(req, res) {
		res.json(await Recipes.add(req.body));
	},

	async update(req, res) {
		res.json(await Recipes.edit());
	},

	async remove(req, res) {
		res.send("works");
	},
};

module.exports = recipesController;
