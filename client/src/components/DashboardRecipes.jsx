import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../ store/recipe";
import NavBar from "./NavBar";
import EmptyLandingPage from "./NoRecipes";
import RecipeDisplay from "./RecipeDisplayCard";

export default function DashboardRecipes() {
	const recipes = useSelector((state) => state.recipes.recipeList);
  const [active, setActive] = useState(false);
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);


	if (!recipes.length) {
		return <EmptyLandingPage />;
	}

	return (

		<>
		{/* <NavBar /> */}
			<div className="recipes-container">
				<div className="recipe-label">
					{recipes?.map((recipe) => (
						<div className="individual-recipe" key={recipe.recipe_id}>
							<h1 onClick={() => setActive(!active)}>{recipe.recipe_title}</h1>
							{active && <RecipeDisplay/>}
							
						</div>
					))}
				</div>
			</div>
		</>
	);
}
