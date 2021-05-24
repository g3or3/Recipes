const jwt = require("jsonwebtoken");

module.exports = ({ user_id, username }) => {
	const payload = {
		subject: user_id,
		username,
	};
	const options = {
		expiresIn: "1d",
	};

	const SECRET = process.env.SECRET || "dev_secret";

	return jwt.sign(payload, SECRET, options);
};
