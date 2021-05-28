import { createSlice } from "@reduxjs/toolkit";
import { axiosWithAuth } from "../auth/axiosWithAuth";

const recipes = createSlice({
	name: "recipes",
	initialState: {
		recipeList: [],
	},
	reducers: {
		recipesFetched: (recipes, action) => {
			recipes.recipeList = action.payload;
		},
		recipeAdded: (recipes, action) => {
			recipes.recipeList.push(action.payload);
		},
		recipeEdited: (recipes, action) => {
			recipes.recipeList = recipes.recipeList.map((recipe) => {
				return recipe.recipe_id === action.payload.recipe_id ? action.payload : recipe;
			});
		},
		recipeRemoved: (recipes, action) => {
			recipes.recipeList = recipes.recipeList.filter(
				(recipe) => recipe.recipe_id !== action.payload.recipe_id
			);
		},
	},
});

export const fetchRecipes = () => (dispatch) => {
	axiosWithAuth()
		.get("/api/recipes")
		.then((res) => {
			dispatch(recipesFetched(res.data));
		});
};

export const addRecipe = (newRecipe) => (dispatch) => {
	axiosWithAuth()
		.post("/api/recipes", newRecipe)
		.then((res) => {
			dispatch(recipeAdded(res.data));
		});
};

export const editRecipe = (id, editedRecipe) => (dispatch) => {
	axiosWithAuth()
		.put(`/api/recipes/${id}`, editedRecipe)
		.then((res) => {
			dispatch(recipeEdited(res.data));
		});
};

export const removeRecipe = (id) => (dispatch) => {
	axiosWithAuth()
		.delete(`/api/recipes/${id}`)
		.then((res) => {
			dispatch(recipeRemoved(res.data));
		});
};

export const { recipesFetched, recipeAdded, recipeEdited, recipeRemoved } =
	recipes.actions;

export default recipes.reducer;
