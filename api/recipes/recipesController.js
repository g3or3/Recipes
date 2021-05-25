const Recipes = require("./recipesModel");

let recipe, recipe_id, user_id;

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

	async update(req, res) {
		res.json(await Recipes.edit());
	},

	async remove(req, res) {
		user_id = req.decoded.subject;
		recipe_id = req.params.id;

		await Recipes.drop(user_id, recipe_id);
		res.json(req.recipe);
	},
};

module.exports = recipesController;
