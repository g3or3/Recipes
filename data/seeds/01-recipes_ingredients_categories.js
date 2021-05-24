const recipes = [
	{ recipe_title: "Bacon Omelette", source: "The Cooking Channel" },
	{ recipe_title: "Ceviche", source: "Grandma Beth" },
	{ recipe_title: "Lasagna", source: "recipes.com" },
	{ recipe_title: "Chocolate Chip Cookies", source: "Cooking Magazine" },
];

const ingredients = [
	{ ingredient_name: "Cheese" },
	{ ingredient_name: "Eggs" },
	{ ingredient_name: "Bacon" },
	{ ingredient_name: "Shrimp" },
	{ ingredient_name: "Lemon" },
	{ ingredient_name: "Tomatoes" },
	{ ingredient_name: "Pasta" },
	{ ingredient_name: "Beef" },
	{ ingredient_name: "Flour" },
	{ ingredient_name: "Chocolate Chips" },
];

const categories = [
	{ category_name: "Breakfast" },
	{ category_name: "Lunch" },
	{ category_name: "Dinner" },
	{ category_name: "Dessert" },
];

exports.seed = async function (knex) {
	await knex("recipes").insert(recipes);
	await knex("ingredients").insert(ingredients);
	await knex("categories").insert(categories);
};
