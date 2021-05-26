const Recipes = require("./recipesModel");
const recipeSchema = require("./validation");

const validateId = async (req, res, next) => {
	const user_id = req.decoded.subject;
	const recipe_id = req.params.id;

	const [recipe] = await Recipes.get({ user_id, recipe_id });

	if (!recipe)
		return next({
			status: 401,
			source: "Error while fetching recipe.",
			message: "That recipe doesn't exist.",
		});

	req.recipe = recipe;
	next();
};

const validateBody = async (req, res, next) => {
	try {
		req.body = await recipeSchema.validateAsync(req.body, { stripUnknown: true });
		next();
	} catch (err) {
		let source;
		if (req.method === "POST") source = "Error while creating a new recipe.";
		else if (req.method === "PUT") source = "Error while updating a recipe.";

		next({
			status: 400,
			source,
			message: err.details[0].message,
		});
	}
};

module.exports = { validateId, validateBody };
