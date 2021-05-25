import Registration from "./components/Registration";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import DashboardRecipes from "./components/DashboardRecipes";
import EditRecipe from "./components/EditRecipe";

function App() {
  return (
    <Switch>
      {/* exact route will change to homepage when it is finished */}
      <Route exact path="/" component={Registration} />
      <Route path="/login" component={Login} />
      {/* <Route path="/signup" component={Registration} /> */}

      {/* Protected Paths Below */}
      <Route path="/recipes" component={DashboardRecipes} />
      <Route path="/edit-recipe" component={EditRecipe} />
    </Switch>
  );
}

export default App;
