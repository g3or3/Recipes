import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import React from "react";
import axios from "axios";
import { axiosWithAuth } from "../auth/axiosWithAuth";

const users = createSlice({
  name: "users",
  initialState: {
    loading: false,
  },
  reducers: {
    login: (users, action) => {
      localStorage.setItem("token", action.payload);
    },
    logout: (users, action) => {
		axiosWithAuth().post('/logout')
       .then(res => {
		   localStorage.removeItem('token');
		window.location.href = '/login';
	   })
	.catch(err => {
		console.log(err);
	)}
	}
=======
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
>>>>>>> 76aadd83ffbbf7b9d67324088ae35406c2aa3277

export default users.reducer;
