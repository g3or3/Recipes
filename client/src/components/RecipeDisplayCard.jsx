import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchRecipes, removeRecipe } from "../store/recipe";
import styled from "styled-components";

export default function RecipeDisplay({ recipe }) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleEdit = (id) => {
    push(`/edit-recipe/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(removeRecipe(id));
  };

  return (
    <StyledCard>
      <div className="container">
        <h1 onClick={() => setActive(!active)}>{recipe.recipe_title}</h1>
        {active && (
          <div className="recipe-card">
            <h3>
              Source: <span className="italic">{recipe.source}</span>
            </h3>
            <h4 className="categories">Categories:</h4>
            {recipe.categories?.map((category) => {
              return (
                <p className="italic" key={category}>
                  {category}
                </p>
              );
            })}
            {recipe.instructions.map((instruction, idx) => {
              return (
                <div className="recipe-instructions" key={idx}>
                  <h4>
                    Step {instruction.step_number}:{" "}
                    <span className="italic">{instruction.description}</span>
                  </h4>
                  {instruction.ingredients?.map((ingredient, idx) => {
                    return (
                      <p key={idx}>
                        {ingredient.ingredient_name} ({ingredient.quantity})
                      </p>
                    );
                  })}
                </div>
              );
            })}
            <div className="buttons">
              <button onClick={() => handleEdit(recipe.recipe_id)}>
                Edit Recipe
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(recipe.recipe_id)}
              >
                Delete Recipe
              </button>
            </div>
          </div>
        )}
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  .container {
    background-color: ${(props) => props.theme.primaryColor};
    box-shadow: 0px 0px 15px #37413a;
    width: 60vh;
    margin: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    cursor: pointer;
    font-size: 3rem;
  }

  h3 {
    font-size: 2rem;
    padding: 2% 0;
  }

  h4 {
    font-size: 1.8rem;
    padding: 1%;
  }

  h5 {
    font-size: 1.6rem;
  }

  p {
    font-size: 1.4rem;
    padding: 1%;
  }

  .italic {
    font-style: italic;
  }

  .categories {
    padding-top: 5%;
  }

  .recipe-card {
    background-color: ${(props) => props.theme.primaryColor};
    box-shadow: none;
    padding-bottom: 5%;
  }

  .recipe-instructions {
    padding-top: 8%;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8%;
  }

  button {
    padding: 1% 3%;
    margin: 2%;
    width: fit-content;
    font-size: 1.8rem;
    border: none;
    border-radius: 12px;
    color: #2e2e2e;
    background-color: ${(props) => props.theme.secondaryColor};
    cursor: pointer;
    box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
    &:active {
      background-color: #558da7;
    }
  }

  .delete-button {
    background-color: #d44f4f;
  }
`;
