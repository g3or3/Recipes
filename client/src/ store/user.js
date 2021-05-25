import { createSlice } from "@reduxjs/toolkit";
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

export default users.reducer;
