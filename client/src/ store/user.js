import { createSlice } from "@reduxjs/toolkit";
import { axiosWithAuth } from "../auth/axiosWithAuth";

const users = createSlice({
	name: "users",
	initialState: {
		loading: false,
	},
	reducers: {
		setLoading: (users) => {
			users.loading = !users.loading
		},
		login: (users, action) => {
			users.loading = action.payload
			localStorage.setItem("token", action.payload.token);
		},
		logout: (users) => {
			localStorage.removeItem("token")
		},
	},
});

export const userLogin = (inputs) => (dispatch) => {
	dispatch(setLoading())
	axiosWithAuth()
		.post("api/login", inputs)
		.then(res => {
			dispatch(login(res.data))
			dispatch(setLoading())
		})
		.catch(err => {
			console.log(err, {err})
		})
}

export const userRegister = (inputs) => (dispatch) => {
	dispatch(setLoading())
	axiosWithAuth()
	.post("api/register", inputs)
	.then(res => {
		dispatch(setLoading())
	.catch(err => {
		console.log(err, {err})
	})
	})
}
export const {login, logout, setLoading} = users.actions
export const selectUser = (users) => users.loading.loading
export default users.reducer;
