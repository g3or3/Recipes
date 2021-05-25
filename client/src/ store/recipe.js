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
	},
});

export const fetchRecipes = () => (dispatch) => {
	axiosWithAuth()
		.get("/api/recipes")
		.then((res) => {
			dispatch(recipesFetched(res.data));
		});
};
export const { recipesFetched } = recipes.actions;

export default recipes;
