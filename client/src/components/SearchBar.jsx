import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../store/recipe";

function SearchBar() {
	const recipes = useSelector((state) => state.recipes.recipeList);
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	return (
		<div className="searchbar">
			<input
				type="text"
				placeholder="type to search..."
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
			{/* {recipes
				.filter((val) => {
					if (search === "") {
						return val;
					} else if (val.recipe_title.toLowerCase().includes(search.toLowerCase())) {
						return val;
					}
				})
				?.map((recipe) => {
					return (
						<div className="search-results" key={recipe.recipe_id}>
							<h1>{recipe.recipe_title}</h1>
						</div>
					);
				})} */}
		</div>
	);
}

export default SearchBar;
