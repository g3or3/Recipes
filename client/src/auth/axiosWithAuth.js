import axios from "axios";

export const axiosWithAuth = () => {
	return axios.create({
		headers: {
			Authorization: localStorage.getItem("token"),
		},
		baseURL: "https://secret-recipes-3.herokuapp.com/",
	});
};
