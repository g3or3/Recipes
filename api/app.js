const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const { restricted } = require("./auth/authMiddleware");

const app = express();

app.use(cors());
app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);

// app.use(
// 	helmet.contentSecurityPolicy({
// 		directives: {
// 			objectSrc: ["'none'"],
// 			styleSrc: ["self"],
// 			defaultSrc: ["'self'"],
//       scriptSrc: ['unsafe-inline']
// 		},
// 	})
// );

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/api/auth", require("./auth/authRouter"));
app.use("/api/recipes", restricted, require("./recipes/recipesRouter"));

app.use("/*", (req, res) => {
	if (
		req.method === "GET" &&
		req.accepts("html") &&
		!req.is("json") &&
		!req.path.includes(".")
	)
		res.sendFile(path.join(__dirname + "../client/build", "index.html"));
});

app.use((err, req, res, next) => {  //eslint-disable-line
	res.status(err.status || 500).json({
		message: err.message,
		source: err.source,
	});
});

module.exports = app;
