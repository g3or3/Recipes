import { createSlice } from "@reduxjs/toolkit";
import { axiosWithAuth } from "../auth/axiosWithAuth";

const users = createSlice({
	name: "users",
	initialState: {
		loading: false,
		registerSuccess: null,
		loginSuccess: null,
	},
	reducers: {
		setLoading: (users) => {
			users.loading = !users.loading;
		},
		register: (users, action) => {
			if (action.payload.attempt === false) users.registerSuccess = false;
			else users.registerSuccess = true;
		},
		login: (users, action) => {
			if (action.payload.attempt === false) users.loginSuccess = false;
			else {
				localStorage.setItem("token", action.payload.token);
				users.loginSuccess = true;
			}
		},
		logout: (users) => {
			localStorage.removeItem("token");
			users.registerSuccess = null;
			users.loginSuccess = null;
		},
	},
});

export const userLogin = (inputs) => (dispatch) => {
	dispatch(setLoading());
	axiosWithAuth()
		.post("/api/auth/login", inputs)
		.then((res) => {
			dispatch(login(res.data));
			dispatch(setLoading());
		})
		.catch((err) => {
			dispatch(login({ attempt: false }));
			console.log(err, { err });
		});
};

export const userRegister = (inputs) => (dispatch) => {
	dispatch(setLoading());
	axiosWithAuth()
		.post("/api/auth/register", inputs)
		.then((res) => {
			dispatch(register({ attempt: true }));
			dispatch(setLoading());
		})
		.catch((err) => {
			dispatch(register({ attempt: false }));
			console.log(err, { err });
		});
};
export const { register, login, logout, setLoading } = users.actions;

export default users.reducer;
