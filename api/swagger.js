const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = require("./swaggerConfig");

const options = {
	swaggerDefinition,
	apis: ["./api/recipes/recipesRouter.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
