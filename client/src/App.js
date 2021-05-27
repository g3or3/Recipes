import { Switch, Route } from "react-router-dom";
import Registration from "./components/Registration";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import DashboardRecipes from "./components/DashboardRecipes";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";

function App() {
	return (
		<Switch>
			<Route path="/register" component={Registration} />
			<Route path="/login" component={Login} />

			{/* Protected Paths Below */}
			<Route path="/recipes" component={DashboardRecipes} />
			<Route path="/add-recipe" component={AddRecipe} />
			<Route path="/edit-recipe/:id" component={EditRecipe} />

			<Route path="/" component={LandingPage} />
		</Switch>
	);
}

export default App;
