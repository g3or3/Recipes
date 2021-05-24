const categories = [
	{ recipe_id: 1, category_id: 1 },
	{ recipe_id: 2, category_id: 1 },
	{ recipe_id: 2, category_id: 2 },
	{ recipe_id: 3, category_id: 2 },
	{ recipe_id: 3, category_id: 3 },
	{ recipe_id: 4, category_id: 4 },
];

exports.seed = function (knex) {
	return knex("categories_per_recipe").insert(categories);
};
