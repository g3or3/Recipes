const db = require("../../data/dbConfig");
const shapeRecipe = require("./utils/shapeRecipe");

const get = async ({ user_id, recipe_id }) => {
	const results = await db
		.select(
			"r.recipe_id",
			"recipe_title",
			"source",
			"c.category_id",
			"category_name",
			"step_number",
			"description",
			"ing.ingredient_id",
			"ingredient_name",
			"quantity"
		)
		.from("recipes as r")
		.join("categories_per_recipe as cpr", "cpr.recipe_id", "r.recipe_id")
		.join("categories as c", "c.category_id", "cpr.category_id")
		.rightJoin("instructions as i", "i.recipe_id", "r.recipe_id")
		.leftJoin(
			"ingredients_per_instruction as ipi",
			"ipi.instruction_id",
			"i.instruction_id"
		)
		.leftJoin("ingredients as ing", "ing.ingredient_id", "ipi.ingredient_id")
		.where({ user_id })
		.orderBy(["r.recipe_id", "step_number"])
		.modify(function (queryBuilder) {
			if (recipe_id) {
				queryBuilder.where({ "r.recipe_id": recipe_id });
			}
		});

	return shapeRecipe(results);
};

const add = async ({ recipe, user_id }) => {
	let newRecipeId, category_id, instruction_id, ingredient_id;

	const { recipe_title, source, categories, instructions } = recipe;

	await db.transaction(async (trx) => {
		const [{ recipe_id }] = await trx("recipes").insert(
			{ recipe_title, source, user_id },
			["recipe_id"]
		);

		for (let category_name of categories) {
			const existingCategory = await trx("categories").where({ category_name }).first();

			if (!existingCategory)
				[{ category_id }] = await trx("categories").insert({ category_name }, [
					"category_id",
				]);
			else category_id = existingCategory.category_id;

			await trx("categories_per_recipe").insert({ category_id, recipe_id });
		}

		for (let instruction of instructions) {
			const { step_number, description, ingredients } = instruction;

			[{ instruction_id }] = await trx("instructions").insert(
				{ step_number, description, recipe_id },
				["instruction_id"]
			);

			if (ingredients)
				for (let ingredient of ingredients) {
					const { ingredient_name, quantity } = ingredient;

					const existingIngredient = await trx("ingredients")
						.where({ ingredient_name })
						.first();

					if (!existingIngredient)
						[{ ingredient_id }] = await trx("ingredients").insert({ ingredient_name }, [
							"ingredient_id",
						]);
					else ingredient_id = existingIngredient.ingredient_id;

					await trx("ingredients_per_instruction").insert({
						quantity,
						ingredient_id,
						instruction_id,
					});
				}
		}
		newRecipeId = recipe_id;
	});

	return get({ user_id, recipe_id: newRecipeId });
};

const edit = async ({ prevRecipe, newRecipe, user_id }) => {
	let category_id, instruction_id, ingredient_id;
	const recipe_id = prevRecipe.recipe_id;

	await db.transaction(async (trx) => {
		if (prevRecipe.recipe_title !== newRecipe.recipe_title) {
			await trx("recipes")
				.update({ recipe_title: newRecipe.recipe_title })
				.where({ recipe_id });
		}

		if (prevRecipe.source !== newRecipe.source) {
			await trx("recipes").update({ source: newRecipe.source }).where({ recipe_id });
		}

		let prevCategories = prevRecipe.categories;

		for (let category_name of newRecipe.categories) {
			if (prevCategories.includes(category_name)) {
				prevCategories = prevCategories.filter((c) => c !== category_name);
			} else {
				const existingCategory = await trx("categories").where({ category_name }).first();
				if (!existingCategory)
					[{ category_id }] = await trx("categories").insert({ category_name }, [
						"category_id",
					]);
				else category_id = existingCategory.category_id;

				await trx("categories_per_recipe").insert({ category_id, recipe_id });
			}
		}

		if (prevCategories.length) {
			for (let category_name of prevCategories) {
				const { category_id } = await trx("categories").where({ category_name }).first();
				await trx("categories_per_recipe").where({ category_id, recipe_id }).del();
			}
		}

		let newInstructions = newRecipe.instructions;
		let prevInstructions = prevRecipe.instructions;

		for (let idx = 0; idx < newInstructions.length; idx++) {
			if (prevInstructions[idx]) {
				if (newInstructions[idx].description !== prevInstructions[idx].description) {
					[instruction_id] = await trx("instructions")
						.returning("instruction_id")
						.update({ description: newInstructions[idx].description })
						.where({ recipe_id, description: prevInstructions[idx].description });
				} else {
					const id = await db("instructions")
						.select("instruction_id")
						.where({ recipe_id, description: prevInstructions[idx].description })
						.first();
					instruction_id = id.instruction_id;
				}
				if (newInstructions[idx].ingredients) {
					let curr = 1;
					const lengthIngredientsInInstruction = newInstructions[idx].ingredients.length;

					for (let ingredient of newInstructions[idx].ingredients) {
						const { ingredient_name, quantity } = ingredient;

						let prevIngredientList = prevInstructions[idx].ingredients;

						const prevIngredient = prevIngredientList.find(
							(i) => i.ingredient_name === ingredient_name
						);
						if (prevIngredient) {
							if (quantity !== prevIngredient.quantity) {
								await trx("ingredients_per_instruction").update({ quantity }).where({
									ingredient_id: prevIngredient.ingredient_id,
									instruction_id,
								});
							}
							prevIngredientList = prevIngredientList.filter(
								(i) => i.ingredient_name !== prevIngredient.ingredient_name
							);
						} else {
							const existingIngredient = await trx("ingredients")
								.where({ ingredient_name })
								.first();

							if (!existingIngredient)
								[{ ingredient_id }] = await trx("ingredients").insert(
									{ ingredient_name },
									["ingredient_id"]
								);
							else ingredient_id = existingIngredient.ingredient_id;

							await trx("ingredients_per_instruction").insert({
								quantity,
								ingredient_id,
								instruction_id,
							});
						}
						if (curr === lengthIngredientsInInstruction)
							for (let ingredient of prevIngredientList) {
								const { ingredient_id, quantity } = ingredient;
								await trx("ingredients_per_instruction")
									.where({ instruction_id, ingredient_id, quantity })
									.del();
							}
						curr++;
					}
				} else if (prevInstructions[idx].ingredients) {
					for (let ingredient of prevInstructions[idx].ingredients) {
						const { ingredient_id, quantity } = ingredient;
						await trx("ingredients_per_instruction")
							.where({ instruction_id, ingredient_id, quantity })
							.del();
					}
				}
			} else {
				const { step_number, description, ingredients } = newInstructions[idx];
				const [{ instruction_id }] = await trx("instructions").insert(
					{ step_number, description, recipe_id },
					["instruction_id"]
				);

				if (ingredients)
					for (let ingredient of ingredients) {
						const { ingredient_name, quantity } = ingredient;

						const existingIngredient = await trx("ingredients")
							.where({ ingredient_name })
							.first();

						if (!existingIngredient)
							[{ ingredient_id }] = await trx("ingredients").insert({ ingredient_name }, [
								"ingredient_id",
							]);
						else ingredient_id = existingIngredient.ingredient_id;

						await trx("ingredients_per_instruction").insert({
							quantity,
							ingredient_id,
							instruction_id,
						});
					}
			}
		}

		if (prevInstructions.length > newInstructions.length) {
			for (let idx = newInstructions.length; idx < prevInstructions.length; idx++) {
				await trx("instructions")
					.where({ step_number: prevInstructions[idx].step_number })
					.del();
			}
		}
	});

	return get({ user_id, recipe_id });
};

const drop = (recipe_id) => {
	return db("recipes").where({ recipe_id }).del();
};

module.exports = { get, add, edit, drop };
