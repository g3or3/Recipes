const Recipes = require("./recipesModel");

const recipesController = {
	async getAll(req, res) {
		res.json(await Recipes.get(req.decoded.subject));
	},

	async getById(req, res) {
		res.json(req.recipe);
	},

	async create(req, res) {
		res.json(await Recipes.add(req.body, req.decoded.subject));
	},

	async update(req, res) {
		res.json(await Recipes.edit());
	},

	async remove(req, res) {
		await Recipes.drop(req.decoded.subject, req.params.id);
		res.json(req.recipe);
	},
};

module.exports = recipesController;
