const Recipes = require("./recipesModel");

let recipe, user_id;

const recipesController = {
	async getAll(req, res, next) {
		user_id = req.decoded.subject;

		try {
			res.json(await Recipes.get({ user_id }));
		} catch {
			next({
				status: 400,
				source: "Error while fetching recipes.",
				message: "Something went wrong in the database.",
			});
		}
	},

	async getById(req, res) {
		res.json(req.recipe);
	},

	async create(req, res, next) {
		recipe = req.body;
		user_id = req.decoded.subject;

		try {
			const [newRecipe] = await Recipes.add({ recipe, user_id });
			res.status(201).json(newRecipe);
		} catch {
			next({
				source: "Error while creating a new recipe.",
				message: "Something went wrong in the database.",
			});
		}
	},

	async update(req, res, next) {
		recipe = req.body;
		user_id = req.decoded.subject;

		try {
			const [updatedRecipe] = await Recipes.edit({
				prevRecipe: req.recipe,
				newRecipe: recipe,
				user_id,
			});
			res.json(updatedRecipe);
		} catch {
			next({
				source: "Error while updating a recipe.",
				message: "Something went wrong in the database.",
			});
		}
	},

	async remove(req, res, next) {
		try {
			await Recipes.drop(req.recipe.recipe_id);
			res.json(req.recipe);
		} catch {
			next({
				status: 400,
				source: "Error while deleting a recipe.",
				message: "Something went wrong in the database.",
			});
		}
	},

	async notFound(req, res, next) {
		next({ status: 404, message: "Resource not found." });
	},
};

module.exports = recipesController;
