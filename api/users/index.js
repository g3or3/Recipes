const db = require("../../data/dbConfig");

const findBy = (filter) => {
	return db("users").select("user_id", "username").where(filter).first();
};

const add = async (user) => {
	const [{ user_id }] = await db("users").insert(user, ["user_id"]);

	return findBy({ user_id });
};

module.exports = { findBy, add };
