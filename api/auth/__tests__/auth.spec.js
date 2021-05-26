const request = require("supertest");
const cleaner = require("knex-cleaner");
const app = require("../../../app");
const db = require("../../../data/dbConfig");
const Users = require("../../users");

let res;

const attempt = {
	success: { username: "testuser", password: "testpassword" },
	wrongUsername: { username: "testUser", password: "testpassword" },
	wrongPassword: { username: "testuser", password: "wrongpassword" },
	missingUsername: { password: "testpassword" },
	missingPassword: { username: "testuser" },
	usernameInvalid: { username: "a", password: "bcdefghi" },
	passwordInvalid: { username: "abcdefgh", password: "i" },
	sameFields: { username: "sameasother", password: "sAmEaSoThEr" },
};

const errMsg = {
	register: "Error while registering.",
	existingUsername: "That username is taken.",
	login: "Error while logging in.",
	wrongUsername: "User does not exist.",
	wrongPassword: "Invalid credentials.",
	missingUsername: "Username is required.",
	missingPassword: "Password is required.",
	usernameInvalid: "Username must be at least 6 characters long.",
	passwordInvalid: "Password must be at least 8 characters long.",
	sameFields: "Password cannot be the same as your username.",
};

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

beforeEach(async () => {
	await cleaner.clean(db, {
		ignoreTables: ["knex_migrations", "knex_migrations_lock"],
	});
});

afterAll(async () => {
	await db.destroy();
});

describe("[POST] /register", () => {
	it("registers a new user successfully", async () => {
		res = await request(app).post("/api/auth/register").send(attempt.success);
		expect(res.body).toHaveProperty("user_id");
		expect(res.body).toHaveProperty("username");
	});

	it("adds the registered user to the database", async () => {
		res = await request(app).post("/api/auth/register").send(attempt.success);
		const registeredUser = await Users.findBy({ user_id: res.body.user_id });
		expect(registeredUser).toHaveProperty("user_id");
		expect(registeredUser).toHaveProperty("username");
		expect(registeredUser).toHaveProperty("password");
	});

	describe("invalid register attempts", () => {
		afterEach(() => {
			expect(res.body.source).toContain(errMsg.register);
		});

		it("catches existing username", async () => {
			await request(app).post("/api/auth/register").send(attempt.success);
			res = await request(app).post("/api/auth/register").send(attempt.success);
			expect(res.body.message).toContain(errMsg.existingUsername);
		});

		it("catches missing username", async () => {
			res = await request(app).post("/api/auth/register").send(attempt.missingUsername);
			expect(res.body.message).toContain(errMsg.missingUsername);
		});

		it("catches missing password", async () => {
			res = await request(app).post("/api/auth/register").send(attempt.missingPassword);
			expect(res.body.message).toContain(errMsg.missingPassword);
		});

		it("catches minimum username length  ", async () => {
			res = await request(app).post("/api/auth/register").send(attempt.usernameInvalid);
			expect(res.body.message).toContain(errMsg.usernameInvalid);
		});

		it("catches minimum password length", async () => {
			res = await request(app).post("/api/auth/register").send(attempt.passwordInvalid);
			expect(res.body.message).toContain(errMsg.passwordInvalid);
		});

		it("catches same username as password case insensitive", async () => {
			res = await request(app).post("/api/auth/register").send(attempt.sameFields);
			expect(res.body.message).toContain(errMsg.sameFields);
		});
	});
});

describe("[POST] /login", () => {
	it("logs in a user successfully", async () => {
		await request(app).post("/api/auth/register").send(attempt.success);
		res = await request(app).post("/api/auth/login").send(attempt.success);
		expect(res.body).toHaveProperty("message");
		expect(res.body).toHaveProperty("token");
	});

	describe("invalid login attempts", () => {
		afterEach(() => {
			expect(res.body.source).toContain(errMsg.login);
		});

		it("catches username that does not exist", async () => {
			await request(app).post("/api/auth/register").send(attempt.success);
			res = await request(app).post("/api/auth/login").send(attempt.wrongUsername);
			expect(res.body.message).toContain(errMsg.wrongUsername);
		});

		it("catches wrong password", async () => {
			await request(app).post("/api/auth/register").send(attempt.success);
			res = await request(app).post("/api/auth/login").send(attempt.wrongPassword);
			expect(res.body.message).toContain(errMsg.wrongPassword);
		});

		it("catches missing username", async () => {
			res = await request(app).post("/api/auth/login").send(attempt.missingUsername);
			expect(res.body.message).toContain(errMsg.missingUsername);
		});

		it("catches missing password", async () => {
			res = await request(app).post("/api/auth/login").send(attempt.missingPassword);
			expect(res.body.message).toContain(errMsg.missingPassword);
		});

		it("catches minimum username length  ", async () => {
			res = await request(app).post("/api/auth/login").send(attempt.usernameInvalid);
			expect(res.body.message).toContain(errMsg.usernameInvalid);
		});

		it("catches minimum password length", async () => {
			res = await request(app).post("/api/auth/login").send(attempt.passwordInvalid);
			expect(res.body.message).toContain(errMsg.passwordInvalid);
		});

		it("catches same username as password case insensitive", async () => {
			res = await request(app).post("/api/auth/login").send(attempt.sameFields);
			expect(res.body.message).toContain(errMsg.sameFields);
		});
	});
});
