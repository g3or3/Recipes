const { restricted } = require("./auth/authMiddleware");
const express = require("express");

const app = express();

app.use(require("helmet")());
app.use(express.json());

app.use("/api/auth", require("./auth/authRouter"));
app.use("/api/recipes", restricted, require("./recipes/recipesRouter"));

app.use((err, req, res, next) => { //eslint-disable-line
	res.status(err.status || 500).json({
		message: err.message,
		source: err.source,
	});
});

module.exports = app;
