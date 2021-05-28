module.exports = {
	openapi: "3.0.3",
	info: {
		title: "Express Recipes API ",
		version: "1.0.0",
		description: "Recipes CRUD App API",
	},
	servers: [
		{ url: "http://localhost:5000", description: "Development server" },
		{
			url: "https://secret-recipes-3.herokuapp.com/",
			description: "Production server",
		},
	],
	paths: {
		"/api/recipes": {
			get: {
				description: "Returns all recipes for an authenticated user.",
				responses: {
					200: {
						description: "Successful request with recipes array",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/RecipeDb" },
								examples: { recipes: { $ref: "#/components/examples/recipes" } },
							},
						},
					},
					400: {
						description: "Bad request",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Something went wrong in the database.",
										},
										source: {
											type: "string",
											example: "Error while fetching recipes.",
										},
									},
								},
							},
						},
					},
					401: {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "User is not logged in.",
										},
									},
								},
							},
						},
					},
				},
				tags: ["Recipes"],
			},
			post: {
				description: "Creates a new recipe.",
				responses: {
					201: {
						description: "Successful request with the created recipe",
						content: {
							"application/json": { schema: { $ref: "#/components/schemas/RecipeDb" } },
						},
					},
					400: {
						description: "Bad request",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Something went wrong in the database.",
										},
										source: {
											type: "string",
											example: "Error while creating a new recipe.",
										},
									},
								},
							},
						},
					},
					401: {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "User is not logged in.",
										},
									},
								},
							},
						},
					},
				},
				requestBody: {
					required: true,
					content: {
						"application/json": { schema: { $ref: "#/components/schemas/RecipeSend" } },
					},
				},
				tags: ["Recipes"],
			},
		},
		"/api/recipes/{id}": {
			parameters: [
				{
					in: "path",
					name: "id",
					description: "The recipe id",
					required: true,
					schema: { type: "integer" },
				},
			],
			get: {
				description: "Returns all recipes for an authenticated user.",
				responses: {
					200: {
						description: "Successful request with returned recipe",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/RecipeDb" },
								examples: { recipe: { $ref: "#/components/examples/recipe" } },
							},
						},
					},
					400: {
						description: "Bad request",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Something went wrong in the database.",
										},
										source: {
											type: "string",
											example: "Error while fetching recipe.",
										},
									},
								},
							},
						},
					},
					401: {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "User is not logged in.",
										},
									},
								},
							},
						},
					},
				},
				tags: ["Recipes"],
			},
			put: {
				description: "Updates a recipe by its id.",
				responses: {
					200: {
						description: "Successful request with updated recipe",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/RecipeDb" },
								examples: { recipe: { $ref: "#/components/examples/recipe" } },
							},
						},
					},
					400: {
						description: "Bad request",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Something went wrong in the database.",
										},
										source: {
											type: "string",
											example: "Error while updating a recipe.",
										},
									},
								},
							},
						},
					},
					401: {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "User is not logged in.",
										},
									},
								},
							},
						},
					},
				},
				requestBody: {
					required: true,
					content: {
						"application/json": { schema: { $ref: "#/components/schemas/RecipeSend" } },
					},
				},
				tags: ["Recipes"],
			},
			delete: {
				description: "Deletes a recipe by its id.",
				responses: {
					200: {
						description: "Successful request with updated recipe",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/RecipeDb" },
								examples: { recipe: { $ref: "#/components/examples/recipe" } },
							},
						},
					},
					400: {
						description: "Bad request",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Something went wrong in the database.",
										},
										source: {
											type: "string",
											example: "Error while deleting a recipe.",
										},
									},
								},
							},
						},
					},
					401: {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "User is not logged in.",
										},
									},
								},
							},
						},
					},
				},
				tags: ["Recipes"],
			},
		},
	},
	components: {
		schemas: {
			RecipeSend: {
				type: "object",
				description: "The recipe object",
				required: ["recipe_title, source, categories, instructions"],
				properties: {
					recipe_title: { type: "string", description: "The recipe title" },
					source: { type: "string", description: "The recipe source" },
					categories: {
						type: "array",
						description: "The array of categories per recipe",
						items: { type: "string", description: "The category name" },
					},
					instructions: {
						type: "array",
						description: "The array of instructions per recipe",
						items: {
							type: "object",
							description: "The instruction object",
							properties: {
								step_number: {
									type: "integer",
									description: "The instruction step number",
								},
								description: {
									type: "string",
									description: "The instruction description",
								},
								ingredients: {
									type: "array",
									description: "The array of ingredients per instruction",
									items: {
										type: "object",
										description: "The ingredient object",
										properties: {
											ingredient_name: {
												type: "string",
												description: "The name of the ingredient",
											},
											quantity: {
												type: "integer",
												description: "The quantity of the ingredient",
											},
										},
									},
								},
							},
						},
					},
				},
			},
			RecipeDb: {
				type: "object",
				description: "The recipe object",
				required: ["recipe_title, source, categories, instructions"],
				properties: {
					recipe_id: { type: "integer", description: "Unique recipe id" },
					recipe_title: { type: "string", description: "The recipe title" },
					source: { type: "string", description: "The recipe source" },
					categories: {
						type: "array",
						description: "The array of categories per recipe",
						items: { type: "string", description: "The category name" },
					},
					instructions: {
						type: "array",
						description: "The array of instructions per recipe",
						items: {
							type: "object",
							description: "The instruction object",
							properties: {
								step_number: {
									type: "integer",
									description: "The instruction step number",
								},
								description: {
									type: "string",
									description: "The instruction description",
								},
								ingredients: {
									type: "array",
									description: "The array of ingredients per instruction",
									items: {
										type: "object",
										description: "The ingredient object",
										properties: {
											ingredient_id: {
												type: "integer",
												description: "Unique ingredient id",
											},
											ingredient_name: {
												type: "string",
												description: "The name of the ingredient",
											},
											quantity: {
												type: "integer",
												description: "The quantity of the ingredient",
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
		examples: {
			recipe: {
				value: {
					recipe_id: 1,
					recipe_title: "Bacon Omelette",
					source: "Bob Marley",
					categories: ["Breakfast", "Brunch"],
					instructions: [
						{
							step_number: 1,
							description: "Cook the eggs.",
							ingredients: [
								{ ingredient_id: 1, ingredient_name: "Eggs", quantity: 4 },
								{ ingredient_id: 2, ingredient_name: "Cheese", quantity: 2 },
							],
						},
						{
							step_number: 2,
							description: "Add bacon.",
							ingredients: [{ ingredient_id: 3, ingredient_name: "Bacon", quantity: 2 }],
						},
						{ step_number: 3, description: "Enjoy!", ingredients: null },
					],
				},
			},
			recipes: {
				value: [
					{
						recipe_id: 1,
						recipe_title: "Bacon Omelette",
						source: "Bob Marley",
						categories: ["Breakfast", "Brunch"],
						instructions: [
							{
								step_number: 1,
								description: "Cook the eggs.",
								ingredients: [
									{ ingredient_id: 1, ingredient_name: "Eggs", quantity: 4 },
									{
										ingredient_id: 2,
										ingredient_name: "Cheese",
										quantity: 2,
									},
								],
							},
							{
								step_number: 2,
								description: "Add bacon.",
								ingredients: [
									{ ingredient_id: 3, ingredient_name: "Bacon", quantity: 2 },
								],
							},
							{ step_number: 3, description: "Enjoy!", ingredients: null },
						],
					},
				],
			},
		},
	},
};
