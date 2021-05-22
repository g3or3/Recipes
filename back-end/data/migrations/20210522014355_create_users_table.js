exports.up = async function (knex) {
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

	return knex.schema.createTable("users", (tbl) => {
		tbl.uuid("user_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
		tbl.string("username", 20).notNullable().unique();
		tbl.string("password").notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists("users");
};
