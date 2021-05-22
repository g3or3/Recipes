const bcrypt = require("bcryptjs");
const Users = require("../users");
const buildToken = require("./buildToken");

const ROUNDS = process.env.ROUNDS || 8;

const authController = {
	async register(req, res) {
		req.body.password = await bcrypt.hash(req.body.password, parseInt(ROUNDS));

		res.json(await Users.add(req.body));
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
};

module.exports = authController;
