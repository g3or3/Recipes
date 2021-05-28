import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchRecipes } from "../store/recipe";
import EmptyLandingPage from "./NoRecipes";
import RecipeDisplay from "./RecipeDisplayCard";

export default function DashboardRecipes() {
	const recipes = useSelector((state) => state.recipes.recipeList);

	const dispatch = useDispatch();

	const { push } = useHistory();

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	const handleAdd = () => {
		push("/add-recipe");
	};

	if (!recipes.length) {
		return <EmptyLandingPage />;
	}

	return (
		<>
			<div className="recipes-container">
				<button onClick={() => handleAdd()}>Add Recipe</button>
				<div className="recipe-label">
					{recipes?.map((recipe) => (
						<div className="individual-recipe" key={recipe.recipe_id}>
							<RecipeDisplay recipe={recipe} />
						</div>
					))}
				</div>
			</div>
		</>
	);
}
