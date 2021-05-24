const path = require("path");
const express = require("express");
const { restricted } = require("./auth/authMiddleware");

const app = express();

app.use(require("helmet")());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../../", "client/build")));

app.use("/api/auth", require("./auth/authRouter"));
app.use("/api/recipes", restricted, require("./recipes/recipesRouter"));

app.use("*", (req, res) => {
	res.sendFile(path.join(__dirname + "../../", "client/build/index.html"));
});

app.use((err, req, res, next) => { //eslint-disable-line
	res.status(err.status || 500).json({
		message: err.message,
		source: err.source,
	});
});

module.exports = app;
