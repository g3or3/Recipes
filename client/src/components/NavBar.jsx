import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../store/user";

function NavBar() {
	const dispatch = useDispatch();
	const { push } = useHistory();

	const handleClick = (e) => {
		e.persist();
		if (e.target.name === "addRecipe") {
			push("/add-recipe");
		} else if (e.target.name === "logout-button") {
			dispatch(logout());
			push("/login");
		}
		return (
			<div className="navbar">
				<button className="addRecipe" onClick={handleClick}>
					Add Recipe
				</button>

				{/* <button
				onClick={handleClick}
				className="logout-button"
			>
				Logout
			</button> */}
			</div>
		);
	};
}
export default NavBar;
