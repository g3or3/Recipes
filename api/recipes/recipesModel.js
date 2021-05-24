const db = require("../../data/dbConfig");
const shapeRecipe = require("./utils/shapeRecipe");

const get = async (recipe_id) => {
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
		.orderBy(["r.recipe_id", "step_number"])
		.modify(function (queryBuilder) {
			if (recipe_id) {
				queryBuilder.where({ "r.recipe_id": recipe_id });
			}
		});

	return shapeRecipe(results);
};

const add = async (recipe, user_id) => {
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

	return get(newRecipeId);
};

const edit = async () => {};

const drop = (recipe_id) => {
	return db("recipes").where({ recipe_id }).del();
};

module.exports = { get, add, edit, drop };
