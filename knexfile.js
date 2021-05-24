require("dotenv").config();

module.exports = {
	development: {
		client: "pg",
		connection: process.env.DEV_DATABASE_URL,
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
	},

	testing: {
		client: "pg",
		connection: process.env.TESTING_DATABASE_URL,
		migrations: {
			directory: "./data/migrations",
		},
	},

	production: {
		client: "pg",
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
	},
};
