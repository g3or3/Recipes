import React from "react";
import { useHistory } from "react-router";
import NavBar from "./NavBar";

export default function EmptyLandingPage() {
	const { push } = useHistory();

	const handleAdd = () => {
    push("/add-recipe")
  }
	return (
		<div>
			<NavBar />
		<div className="container" id="empty">
			<h2>You don't have any recipes yet!</h2>
			<button onClick={() => handleAdd()}>Create your first recipe</button>
		</div>
		</div>
	);
}
