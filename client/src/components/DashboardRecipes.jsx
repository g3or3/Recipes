import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../ store/recipe";

export default function DashboardRecipes() {
	const recipes = useSelector((state) => state.recipes.recipeList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	return (
		<>
			<div className="recipes-container">
				<div className="recipe-label">
					{recipes?.map((recipe) => (
						<div className="individual-recipe" key={recipe.recipe_id}>
							<h2>{recipe.recipe_title}</h2>
							<p>
								{recipe.source}
								{recipe.categories?.map((category) => {
									return <p>{category}</p>;
								})}
								{recipe.instructions.map((instruction) => {
									return (
										<p>
											{instruction.step_number}
											{instruction.description}
											{instruction.ingredients?.map((ingredient) => {
												return (
													<p>
														{ingredient.ingredient_name}
														{ingredient.quantity}
													</p>
												);
											})}
										</p>
									);
								})}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
