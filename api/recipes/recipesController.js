const Recipes = require("./recipesModel");

let recipe, user_id;

const recipesController = {
	async getAll(req, res) {
		user_id = req.decoded.subject;

		res.json(await Recipes.get({ user_id }));
	},

	async getById(req, res) {
		res.json(req.recipe);
	},

	async create(req, res, next) {
		recipe = req.body;
		user_id = req.decoded.subject;

		try {
			const [newRecipe] = await Recipes.add({ recipe, user_id });
			res.json(newRecipe);
		} catch (err) {
			next({ source: "Error while creating a new recipe.", message: err });
		}
	},

	async update(req, res, next) {
		try {
			const [updatedRecipe] = await Recipes.edit(req.recipe);
			res.json(updatedRecipe);
		} catch (err) {
			next({ source: "Error while updating a recipe.", message: err });
		}
		res.json();
	},

	async remove(req, res) {
		await Recipes.drop(req.recipe.recipe_id);
		res.json(req.recipe);
	},
};

module.exports = recipesController;
