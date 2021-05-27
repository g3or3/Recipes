import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchRecipes } from "../ store/recipe";
import EmptyLandingPage from "./NoRecipes";

export default function DashboardRecipes() {
  const recipes = useSelector((state) => state.recipes.recipeList);
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleEdit = (id) => {
    push(`/edit-recipe/${id}`);
  };

  if (!recipes.length) {
    return <EmptyLandingPage />;
  }

  return (
    <div class="holder">
      <div className="recipes-container">
        <div className="recipe-label">
          {recipes?.map((recipe) => (
            <div className="individual-recipe" key={recipe.recipe_id}>
              <h2>{recipe.recipe_title}</h2>
              <p>
                {recipe.source}
                {recipe.categories?.map((category) => {
                  return <p>{category}</p>;
                })}
                {recipe.instructions.map((instruction) => {
                  return (
                    <p>
                      {instruction.step_number}
                      {instruction.description}
                      {instruction.ingredients?.map((ingredient) => {
                        return (
                          <p>
                            {ingredient.ingredient_name}
                            {ingredient.quantity}
                          </p>
                        );
                      })}
                    </p>
                  );
                })}
              </p>
              <button onClick={() => handleEdit(recipe.recipe_id)}>
                Edit Recipe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
