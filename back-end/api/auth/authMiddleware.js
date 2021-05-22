const jwt = require("jsonwebtoken");
const Users = require("../users");
const userSchema = require("./validation");

const SECRET = process.env.SECRET || "dev_secret";

const restricted = (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) return next({ status: 401, message: "User is not logged in." });

	jwt.verify(token, SECRET, (err, decoded) => {
		if (err) return next({ status: 401, message: "Invalid token." });

		req.decoded = decoded;
		next();
	});
};

const checkIfUserExists = async (req, res, next) => {
	const user = await Users.findBy({ username: req.body.username });

	if (user && req.path === "/register")
		return next({
			status: 400,
			source: "Error while registering.",
			message: "That username is taken.",
		});

	if (req.path === "/login") {
		if (user) req.user = user;
		
    else
			return next({
				status: 400,
				source: "Error while logging in.",
				message: "User does not exist.",
			});
	}

	next();
};

const validateBody = async (req, res, next) => {
	try {
		req.body = await userSchema.validateAsync(req.body, { stripUnknown: true });
		next();
    
	} catch (err) {
		if (req.path === "/register")
			next({
				status: 400,
				source: "Error while registering.",
				message: err.details[0].message,
			});
		if (req.path === "/login")
			next({
				status: 400,
				source: "Error while logging in.",
				message: err.details[0].message,
			});
	}
};

module.exports = { restricted, checkIfUserExists, validateBody };
