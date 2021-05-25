const request = require("supertest");
const cleaner = require("knex-cleaner");
const app = require("../../app");
const db = require("../../../data/dbConfig");

let res, auth;
const user = { username: "testuser", password: "testpassword" };

const recipe = {
	recipe_title: "Shrimp Tacos",
	source: "recipes.com",
	categories: ["Lunch", "Dinner"],
	instructions: [
		{
			description: "Cook shrimp.",
			step_number: 1,
			ingredients: [
				{
					ingredient_name: "Shrimp",
					quantity: 10,
				},
			],
		},
		{
			description: "Love it.",
			step_number: 2,
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

const errMsg = {
	notLoggedIn: "User is not logged in.",
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

describe("[GET] /recipes", () => {
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
});

describe("[POST] /recipes", () => {
	it("creates a new recipe successfully", async () => {
		res = await request(app).post("/api/recipes").set(auth).send(recipe);
		expect(res.body).toMatchObject({ recipe_id: 1, ...recipe });
	});
});
