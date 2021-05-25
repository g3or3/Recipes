import Registration from "./components/Registration";
import "./App.css";
import { Switch, Route } from "react-router-dom"
import Login from "./components/Login";
import DashboardRecipes from "./components/DashboardRecipes";

function App() {
	return (
	<Switch>
		{/* <Route path="/signup" component={Registration} /> */}

		<Route path="/login" component={Login} />

		{/* Protected Paths Below */}
		<Route path="/recipes" component={DashboardRecipes} />
		
		{/* exact route will change to homepage when it is finished */}
		<Route path="/" component={Registration} />
	</Switch>
	)
}

export default App;
