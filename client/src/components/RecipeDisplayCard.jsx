import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchRecipes } from "../store/recipe";

export default function RecipeDisplay({ recipe }) {
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();
	const { push } = useHistory();

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	const handleEdit = (id) => {
		push(`/edit-recipe/${id}`);
	};

	return (
		<>
			<h1 onClick={() => setActive(!active)}>{recipe.recipe_title}</h1>
			{active && (
				<div className="individual-recipe">
					<h3>{recipe.source}</h3>
					{recipe.categories?.map((category) => {
						return <h4 key={category}>{category}</h4>;
					})}
					{recipe.instructions.map((instruction, idx) => {
						return (
							<div className="recipe-instructions" key={idx}>
								<h5>
									{instruction.step_number}
									{instruction.description}
									{instruction.ingredients?.map((ingredient, idx) => {
										return (
											<p key={idx}>
												{ingredient.ingredient_name}
												{ingredient.quantity}
											</p>
										);
									})}
								</h5>
							</div>
						);
					})}
					<button onClick={() => handleEdit(recipe.recipe_id)}>Edit Recipe</button>
				</div>
			)}
		</>
	);
}
