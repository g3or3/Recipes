const recipeSchema = require("./validation");

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

module.exports = { validateBody };
