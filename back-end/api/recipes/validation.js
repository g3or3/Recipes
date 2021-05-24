const Joi = require("joi");

const recipeSchema = Joi.object({
	recipe_title: Joi.string()
		.min(3)
		.message("Recipe title must be at least 3 characters long.")
		.required()
		.messages({
			"any.required": "Recipe title is required.",
			"string.empty": "Recipe title cannot be empty.",
			"string.base": "Recipe titles must be strings.",
		}),
	source: Joi.string()
		.min(3)
		.message("Source must be at least 3 characters long.")
		.required()
		.messages({
			"any.required": "Source is required.",
			"string.empty": "Source cannot be empty.",
			"string.base": "Sources must be strings.",
		}),
	categories: Joi.array()
		.items(
			Joi.string()
				.min(3)
				.message("Category name must be at least 3 characters long.")
				.required()
		)
		.unique()
		.required()
		.messages({
			"any.required": "At least one category is required.",
			"string.base": "Categories must be strings.",
			"array.unique": "No duplicate categories allowed.",
			"array.base": "Categories is an array of one or more categories.",
			"array.includesRequiredUnknowns": "At least one category is required.",
		}),
	instructions: Joi.array()
		.items(
			Joi.object()
				.keys({
					ingredients: Joi.array()
						.items(
							Joi.object().keys({
								ingredient_name: Joi.string()
									.min(2)
									.message("Ingredient name must be at least 2 characters long."),
								quantity: Joi.number()
									.positive()
									.when("ingredient_name", {
										not: Joi.exist(),
										then: Joi.forbidden(),
										otherwise: Joi.required().messages({
											"any.required":
												"If ingredient name is provided quantity is required.",
										}),
									}),
							})
						)
						.unique("ingredient_name")
						.message("No duplicate ingredients."),
					step_number: Joi.number().positive().required(),
					description: Joi.string()
						.min(5)
						.message("Descriptions must be at least 5 characters long.")
						.required(),
				})
				.required()
		)
		.unique("step_number")
		.required()
		.messages({
			"number.base": "Step number must be a positive number.",
			"string.empty": "Description cannot be empty.",
			"any.required":
				"Instructions is an array of one or more instruction objects.\
        Each object contains an ingredients array, a step_number and a description string.",
			"array.unique": "No duplicate step numbers allowed.",
			"array.base":
				"Instructions is an array of one or more instruction objects.\
        Each object contains an ingredients array, a step_number and a description string.",
			"array.includesRequiredUnknowns": "At least one instruction object is required.",
			"object.base": "Instructions is an array of one or more instruction objects.",
			"any.unknown": "Quantity only allowed when providing a valid ingredient.",
		}),
});

module.exports = recipeSchema;
