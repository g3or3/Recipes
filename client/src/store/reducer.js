import { combineReducers } from "@reduxjs/toolkit";
import recipesReducer from "./recipe";
import usersReducer from "./user";

export default combineReducers({
	recipes: recipesReducer,
	users: usersReducer,
});
