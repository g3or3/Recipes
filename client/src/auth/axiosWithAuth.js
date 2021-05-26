import axios from "axios";

export const axiosWithAuth = () => {
	return axios.create({
		headers: {
			Authorization:
				//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiMjcxMThjMTctNDc3ZC00ODhjLWFhNDYtMTg0OWI4NmU0NjI2IiwidXNlcm5hbWUiOiJGcmFuY2lzIiwiaWF0IjoxNjIxODk2MzcxLCJleHAiOjE2MjE5ODI3NzF9.C4eN1qk9WOJW4UVH0ImP914v1f4mvnVoCb359nDbfTU",
				localStorage.getItem("token"),
			},
		baseURL: "https://secret-recipes-3.herokuapp.com/",
	});
};
