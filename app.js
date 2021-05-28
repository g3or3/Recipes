const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const swaggerSpec = require("./api/swagger");
const swaggerUi = require("swagger-ui-express");
const { restricted } = require("./api/auth/authMiddleware");

const app = express();

app.use(cors());
app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/api/auth", require("./api/auth/authRouter"));
app.use("/api/recipes", restricted, require("./api/recipes/recipesRouter"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build", "index.html"));
});

app.use((err, req, res, next) => {  //eslint-disable-line
	res.status(err.status || 500).json({
		message: err.message,
		source: err.source,
	});
});

module.exports = app;
