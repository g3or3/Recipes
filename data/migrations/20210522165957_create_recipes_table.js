exports.up = function (knex) {
	return knex.schema
		.createTable("recipes", (tbl) => {
			tbl.increments("recipe_id");
			tbl.string("recipe_title").notNullable();
			tbl.string("source").notNullable();
		})

		.createTable("categories", (tbl) => {
			tbl.increments("category_id");
			tbl.string("category_name").notNullable().unique();
		})

		.createTable("ingredients", (tbl) => {
			tbl.increments("ingredient_id");
			tbl.string("ingredient_name").notNullable().unique();
		})

		.createTable("instructions", (tbl) => {
			tbl.increments("instruction_id");
			tbl.integer("step_number").unsigned().notNullable();
			tbl.text("description").notNullable();
			tbl
				.integer("recipe_id")
				.unsigned()
				.notNullable()
				.references("recipe_id")
				.inTable("recipes")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})

		.createTable("categories_per_recipe", (tbl) => {
			tbl.increments("category_association_id");
			tbl
				.integer("recipe_id")
				.unsigned()
				.notNullable()
				.references("recipe_id")
				.inTable("recipes")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			tbl
				.integer("category_id")
				.unsigned()
				.notNullable()
				.references("category_id")
				.inTable("categories")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})

		.createTable("ingredients_per_instruction", (tbl) => {
			tbl.increments("ingredient_association_id");
			tbl.integer("quantity").unsigned().defaultTo(null);
			tbl
				.integer("ingredient_id")
				.unsigned()
				.defaultTo(null)
				.references("ingredient_id")
				.inTable("ingredients")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			tbl
				.integer("instruction_id")
				.unsigned()
				.notNullable()
				.references("instruction_id")
				.inTable("instructions")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("ingredients_per_instruction")
		.dropTableIfExists("categories_per_recipe")
		.dropTableIfExists("instructions")
		.dropTableIfExists("ingredients")
		.dropTableIfExists("categories")
		.dropTableIfExists("recipes");
};
