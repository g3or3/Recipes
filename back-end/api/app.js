const express = require("express");

const app = express();

app.use(express.json());
app.use(require("helmet")());

app.use((err, req, res, next) => { //eslint-disable-line
	res.status(err.status || 500).json({
		note: "Something went wrong in the router",
		message: err.message,
	});
});

module.exports = app;