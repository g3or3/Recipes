const Recipes = require("./recipesModel");
const recipeSchema = require("./validation");

const validateId = async (req, res, next) => {
	const [recipe] = await Recipes.get(req.params.id);

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
		next({
			status: 400,
			source: "Error while creating a new recipe.",
			message: err.details[0].message,
		});
	}
};

module.exports = { validateId, validateBody };
