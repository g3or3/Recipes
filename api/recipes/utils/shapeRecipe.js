module.exports = (queryResults) => {
	return queryResults.reduce((recipes, curr) => {
		const {
			recipe_id,
			recipe_title,
			source,
			category_name,
			step_number,
			description,
			ingredient_id,
			ingredient_name,
			quantity,
		} = curr;

		const instructionToAdd = { step_number, description };

		const ingredientToAdd =
			ingredient_id !== null ? { ingredient_id, ingredient_name, quantity } : null;

		const existingRecipe = recipes.find((r) => r.recipe_id === recipe_id);

		const existingCategory = existingRecipe?.categories.includes(category_name);

		const existingStep = existingRecipe?.instructions?.find(
			(i) => i.step_number === step_number
		);

		const existingIngredient = existingStep?.ingredients?.find(
			(i) => i.ingredient_id === ingredient_id
		);

		if (existingRecipe) {
			if (existingCategory) {
				if (existingStep) {
					if (!existingIngredient && ingredientToAdd)
						existingStep.ingredients.push(ingredientToAdd);
				} else
					existingRecipe.instructions.push({
						...instructionToAdd,
						ingredients: ingredientToAdd ? [ingredientToAdd] : null,
					});
			} else {
				existingRecipe.categories.push(category_name);
				if (existingStep) {
					if (!existingIngredient && ingredientToAdd)
						existingStep.ingredients.push(ingredientToAdd);
				} else
					existingRecipe.instructions.push({
						...instructionToAdd,
						ingredients: ingredientToAdd ? [ingredientToAdd] : null,
					});
			}
		} else
			recipes.push({
				recipe_id,
				recipe_title,
				source,
				categories: [category_name],
				instructions: [
					{
						...instructionToAdd,
						ingredients: ingredientToAdd ? [ingredientToAdd] : null,
					},
				],
			});

		return recipes;
	}, []);
};
