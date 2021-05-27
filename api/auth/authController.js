const bcrypt = require("bcryptjs");
const Users = require("../users");
const buildToken = require("./utils/buildToken");

const ROUNDS = process.env.ROUNDS || 8;

const authController = {
	async register(req, res) {
		req.body.password = await bcrypt.hash(req.body.password, parseInt(ROUNDS));

		const { user_id, username } = await Users.add(req.body);

		res.json({ user_id, username });
	},

	async login(req, res, next) {
		const passwordVerified = await bcrypt.compare(req.body.password, req.user.password);

		if (passwordVerified)
			res.json({
				message: `Welcome back, ${req.user.username}.`,
				token: buildToken(req.user),
			});
		else
			next({
				status: 401,
				source: "Error while logging in.",
				message: "Invalid credentials.",
			});
	},

	async notFound(req, res, next) {
		next({ status: 404, message: "Resource not found." });
	},
};

module.exports = authController;
