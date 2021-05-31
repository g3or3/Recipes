import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../store/recipe";
import NavBar from "./NavBar";
import EmptyLandingPage from "./NoRecipes";
import RecipeDisplay from "./RecipeDisplayCard";
import styled from "styled-components";

export default function DashboardRecipes() {
	const recipes = useSelector((state) => state.recipes.recipeList);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	if (!recipes.length) {
		return <EmptyLandingPage />;
	}

	return (
		<StyledDashboard>
			<NavBar />
			<div className="recipes-container">
				<div className="recipe-label">
					{recipes.map((recipe) => (
						<div className="individual-recipe" key={recipe.recipe_id}>
							<RecipeDisplay recipe={recipe} />
						</div>
					))}
				</div>
			</div>
		</StyledDashboard>
	);
}

const StyledDashboard = styled.div`
	.recipes-container {
		text-align: center;
		padding: 1%;
	}

	.recipe-label {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.add-button {
		padding: 1% 3%;
		margin: 2%;
		width: fit-content;
		font-size: 2.5rem;
		border: none;
		border-radius: 12px;
		color: #2e2e2e;
		background-color: ${(props) => props.theme.secondaryColor};
		cursor: pointer;
		box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
		&:active {
			background-color: #558da7;
		}
	}
`;
