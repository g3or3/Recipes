const Joi = require("joi");

const userSchema = Joi.object({
	username: Joi.string()
		.insensitive()
		.trim()
		.min(6).message("Username must be at least 6 characters long.")
		.max(20).message("Username cannot be more than 20 characters long.")
		.required()
		.messages({
			"any.required": "Username is required.",
      "string.base": "Username must be a string.",
			"string.empty": "Username cannot be empty.",
		}),
	password: Joi.string()
		.insensitive()
		.trim()
		.min(8).message("Password must be at least 8 characters long.")
		.max(25).message("Password cannot be more than 25 characters long.")
		.required()
		.disallow(Joi.ref("username"))
		.messages({
			"any.required": "Password is required.",
      "string.base": "Password must be a string.",
			"string.empty": "Password cannot be empty.",
			"any.invalid": "Password cannot be the same as your username.",
		}),
});

module.exports = userSchema;
