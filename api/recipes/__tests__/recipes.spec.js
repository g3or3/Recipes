const request = require("supertest");
const cleaner = require("knex-cleaner");
const app = require("../../../app");
const db = require("../../../data/dbConfig");

let res, auth;
const user = { username: "testuser", password: "testpassword" };

const recipe = {
	recipe_title: "Shrimp Tacos",
	source: "recipes.com",
	categories: ["Lunch", "Dinner"],
	instructions: [
		{
			step_number: 1,
			description: "Cook eggs",
			ingredients: [
				{
					ingredient_name: "Shrimp",
					quantity: 10,
				},
			],
		},
		{
			step_number: 2,
			description: "Love it.",
			ingredients: [
				{
					ingredient_name: "Taco Shells",
					quantity: 5,
				},
				{
					ingredient_name: "Cheese",
					quantity: 3,
				},
			],
		},
	],
};

const editedRecipe = {
	recipe_title: "Omelette",
	source: "Grandma",
	categories: ["Lunch", "Breakfast"],
	instructions: [
		{
			step_number: 1,
			description: "Cook eggs",
			ingredients: [{ ingredient_name: "Eggs", quantity: 3 }],
		},
		{
			step_number: 2,
			description: "Add bacon and cheese",
			ingredients: [
				{ ingredient_name: "Bacon", quantity: 1 },
				{ ingredient_name: "Cheese", quantity: 2 },
			],
		},
		{
			step_number: 3,
			description: "Serve while hot",
			ingredients: [{ ingredient_name: "Salt", quantity: 2 }],
		},
		{
			step_number: 4,
			description: "Enjoy with family",
		},
	],
};

const errMsg = {
	notLoggedIn: "User is not logged in.",
	missingTitle: "Recipe title is required.",
	missingSource: "Source is required.",
	missingCategory: "At least one category is required.",
	missingInstructions: "Instructions is an array of one or more instruction objects.",
	recipeNotExists: "That recipe doesn't exist.",
	invalidRecipeId: "Invalid recipe ID provided.",
};

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

beforeEach(async () => {
	await cleaner.clean(db, {
		ignoreTables: ["knex_migrations", "knex_migrations_lock"],
	});

	await request(app).post("/api/auth/register").send(user);
	res = await request(app).post("/api/auth/login").send(user);
	auth = { Authorization: res.body.token };
});

afterAll(async () => {
	await db.destroy();
});

describe("Not logged in.", () => {
	it("does not allow access to the recipes resource if not logged in.", async () => {
		res = await request(app).get("/api/recipes");
		expect(res.body).toMatchObject({ message: errMsg.notLoggedIn });
	});
});

describe("[GET] /recipes && /recipes/:id", () => {
	beforeEach(async () => {
		await request(app).post("/api/recipes").set(auth).send(recipe);
	});

	it("returns all recipes associated with a user that's logged in", async () => {
		res = await request(app).get("/api/recipes").set(auth);
		expect(res.body).toHaveLength(1);
		expect(res.body[0]).toMatchObject({ recipe_id: 1, ...recipe });
	});

	it("returns a recipe by its id", async () => {
		res = await request(app).get("/api/recipes/1").set(auth);
		expect(res.body).toMatchObject({ recipe_id: 1, ...recipe });
	});

	describe("invalid recipe id", () => {
		it("returns an error message if id of recipe doesn't exist", async () => {
			res = await request(app).get("/api/recipes/256").set(auth);
			expect(res.body).toMatchObject({ message: errMsg.recipeNotExists });
		});

		it("returns an error message if invalid recipe id", async () => {
			res = await request(app).get("/api/recipes/not_a_number").set(auth);
			expect(res.body).toMatchObject({ message: errMsg.invalidRecipeId });
		});
	});
});

describe("[POST] /recipes", () => {
	it("doesn't allow creation of a recipe if not logged in", async () => {
		res = await request(app).post("/api/recipes").send(recipe);
		expect(res.body).toMatchObject({ message: errMsg.notLoggedIn });
	});

	it("creates a new recipe successfully", async () => {
		res = await request(app).post("/api/recipes").set(auth).send(recipe);
		expect(res.body).toMatchObject({ recipe_id: 1, ...recipe });
	});

	describe("invalid create recipe attempts", () => {
		it("does not create a new recipe with missing title", async () => {
			res = await request(app).post("/api/recipes").set(auth).send();
			expect(res.body).toMatchObject({ message: errMsg.missingTitle });
		});

		it("does not create a new recipe with missing source", async () => {
			res = await request(app)
				.post("/api/recipes")
				.set(auth)
				.send({ recipe_title: "Title" });
			expect(res.body).toMatchObject({ message: errMsg.missingSource });
		});

		it("does not create a new recipe with missing categories array and at least one category string", async () => {
			res = await request(app)
				.post("/api/recipes")
				.set(auth)
				.send({ recipe_title: "Title", source: "Source" });
			expect(res.body).toMatchObject({ message: errMsg.missingCategory });
		});

		it("does not create a new recipe with missing instructions array and at least one instruction object", async () => {
			res = await request(app)
				.post("/api/recipes")
				.set(auth)
				.send({ recipe_title: "Title", source: "Source", categories: ["Category"] });
			expect(res.body.message).toContain(errMsg.missingInstructions);
		});
	});
});

describe("[PUT] /recipes/:id", () => {
	let recipe_id;

	beforeEach(async () => {
		res = await request(app).post("/api/recipes").set(auth).send(recipe);
		recipe_id = res.body.recipe_id;
	});

	it("updates a recipe successfully by its id and returns the updated recipe", async () => {
		res = await request(app)
			.put(`/api/recipes/${recipe_id}`)
			.set(auth)
			.send(editedRecipe);
		expect(res.body).toMatchObject(editedRecipe);
	});
});

describe("[DELETE] /recipes/:id", () => {
	let recipe_id;

	beforeEach(async () => {
		res = await request(app).post("/api/recipes").set(auth).send(recipe);
		recipe_id = res.body.recipe_id;
		res = await request(app).get(`/api/recipes/${recipe_id}`).set(auth);
		expect(res.body).toMatchObject(recipe);
	});

	it("deletes a recipe successfully by its id and returns the deleted recipe", async () => {
		res = await request(app).delete(`/api/recipes/${recipe_id}`).set(auth);
		expect(res.body).toMatchObject(recipe);
		res = await request(app).get(`/api/recipes/${recipe_id}`).set(auth);
		expect(res.body).toMatchObject({ message: errMsg.recipeNotExists });
	});
});
