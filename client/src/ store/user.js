import { createSlice } from "@reduxjs/toolkit";

const users = createSlice({
	name: "users",
	initialState: {
		loading: false,
	},
	reducers: {
		login: (users, action) => {
			localStorage.setItem("token", action.payload);
		},
		logout: (users, action) => {},
	},
});
export default users;
