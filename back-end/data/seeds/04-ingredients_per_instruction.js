const ingredientAmounts = [
	{ quantity: 3, ingredient_id: 1, instruction_id: 1 },
	{ quantity: 4, ingredient_id: 2, instruction_id: 1 },
	{ quantity: 2, ingredient_id: 3, instruction_id: 2 },
	{ quantity: 1, ingredient_id: 4, instruction_id: 4 },
	{ quantity: 3, ingredient_id: 5, instruction_id: 5 },
	{ quantity: 3, ingredient_id: 6, instruction_id: 6 },
	{ quantity: 1, ingredient_id: 7, instruction_id: 7 },
	{ quantity: 1, ingredient_id: 8, instruction_id: 8 },
	{ quantity: 3, ingredient_id: 6, instruction_id: 9 },
	{ quantity: 2, ingredient_id: 1, instruction_id: 10 },
	{ quantity: 3, ingredient_id: 9, instruction_id: 11 },
	{ quantity: 5, ingredient_id: 10, instruction_id: 12 },
];

exports.seed = function (knex) {
	return knex("ingredients_per_instruction").insert(ingredientAmounts);
};
