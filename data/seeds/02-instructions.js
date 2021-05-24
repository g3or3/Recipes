const instructions = [
	{ recipe_id: 1, description: "Cook eggs.", step_number: 1 },
	{ recipe_id: 1, description: "Add bacon.", step_number: 2 },
	{ recipe_id: 1, description: "Enjoy your omelette.", step_number: 3 },
	{ recipe_id: 2, description: "Cook shrimp.", step_number: 1 },
	{ recipe_id: 2, description: "Add lemon.", step_number: 2 },
	{ recipe_id: 2, description: "Add tomatoes.", step_number: 3 },
	{ recipe_id: 3, description: "Cook pasta.", step_number: 1 },
	{ recipe_id: 3, description: "Add beef.", step_number: 2 },
	{ recipe_id: 3, description: "Add tomatoes.", step_number: 3 },
	{ recipe_id: 3, description: "Add cheese.", step_number: 4 },
	{ recipe_id: 4, description: "Mix flour.", step_number: 1 },
	{ recipe_id: 4, description: "Add chocolate chips.", step_number: 2 },
	{ recipe_id: 4, description: "Share with others.", step_number: 3 },
];

exports.seed = function (knex) {
	return knex("instructions").insert(instructions);
};
