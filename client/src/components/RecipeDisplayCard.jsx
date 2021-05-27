import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchRecipes } from "../ store/recipe";


export default function RecipeDisplay() {
  const recipes = useSelector((state) => state.recipes.recipeList);
  const dispatch = useDispatch()
	const { push } = useHistory();


  useEffect(() => {
    dispatch(fetchRecipes())
  }, [dispatch])

  const handleEdit = (id) => {
		push(`/edit-recipe/${id}`);
	};

  const handleAdd = () => {
    push("/add-recipe")
  }

  return (
    <>
    <div className="recipes-container">
				<div className="recipe-label">
					{recipes?.map((recipe) => (
						<div className="individual-recipe" key={recipe.recipe_id}>
								<h3>{recipe.source}</h3>
								{recipe.categories?.map((category) => {
									return <h4>{category}</h4>;
								})}
								{recipe.instructions.map((instruction) => {
                  return (
                    <div className="recipe-instructions" key={instruction.instruction_id}>
										<h5>
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
										</h5>
                    </div>
									);
								})}
              <button onClick={() => handleEdit(recipe.recipe_id)}>Edit Recipe</button>
							<button onClick={() => handleAdd(recipe)}>Add Recipe</button>
						</div>
            
					))}
				</div>
			</div>
    </>
  )
}