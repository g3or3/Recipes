import { Switch, Route } from "react-router-dom";
import Registration from "./components/Registration";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import DashboardRecipes from "./components/DashboardRecipes";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Switch>
      <Route path="/register" component={Registration} />
      <Route path="/login" component={Login} />

			{/* Protected Paths Below */}
			<ProtectedRoute path="/recipes" component={DashboardRecipes} />
			<ProtectedRoute path="/add-recipe" component={AddRecipe} />
			<ProtectedRoute path="/edit-recipe/:id" component={EditRecipe} />

      <Route path="/" component={LandingPage} />
      <Route path="/" component={Loading} />
    </Switch>
  );
}

export default App;
