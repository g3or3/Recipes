const Recipes = require("./recipesModel");
const recipeSchema = require("./validation");

const validateId = async (req, res, next) => {
	const user_id = req.decoded.subject;
	const recipe_id = parseInt(req.params.id);

	if (isNaN(recipe_id))
		return next({
			status: 400,
			source: "Error while fetching recipe.",
			message: "Invalid recipe ID provided.",
		});

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
	let source;

	if (req.method === "POST") source = "Error while creating a new recipe.";
	else if (req.method === "PUT") source = "Error while updating a recipe.";

	try {
		req.body = await recipeSchema.validateAsync(req.body, { stripUnknown: true });

		for (
			let idx = 0, stepNumber = 1;
			stepNumber <= req.body.instructions.length;
			idx++, stepNumber++
		) {
			if (req.body.instructions[idx].step_number !== stepNumber)
				return next({
					status: 400,
					source,
					message: "Instruction step number are not sequential.",
				});
		}
		next();
	} catch (err) {
		next({
			status: 400,
			source,
			message: err.details[0].message,
		});
	}
};

module.exports = { validateId, validateBody };
