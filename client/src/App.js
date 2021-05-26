import Registration from "./components/Registration";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components";
import Login from "./components/Login";
import DashboardRecipes from "./components/DashboardRecipes";
import AddRecipe from "./components/AddRecipe";

function App() {
	return (
		<Switch>
			<Route path="/register" component={Registration} />
			<Route path="/login" component={Login} />

			{/* Protected Paths Below */}
			<Route path="/recipes" component={DashboardRecipes} />
			<Route path="/edit-recipe" component={AddRecipe} />

			<Route path="/" component={LandingPage} />
		</Switch>
	);
}

export default App;
