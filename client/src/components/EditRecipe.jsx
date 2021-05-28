import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { axiosWithAuth } from "../auth/axiosWithAuth";
import { editRecipe } from "../store/recipe";
import styled from "styled-components";

const initialFormValues = {
  recipe_title: "",
  source: "",
  category: "",
  step: "",
  description: "",
  ingredientName: "",
  ingredientQuantity: "",
};

export default function EditRecipe() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [disabledCategory, setDisabledCategory] = useState(true);
  const [disabledIngredient, setDisabledIngredient] = useState(true);
  const [disabledInstruction, setDisabledInstruction] = useState(true);
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  const dispatch = useDispatch();

  const { push } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosWithAuth().get(`api/recipes/${id}`);
        const { recipe_title, source, categories, instructions } = data;

        setFormValues((prev) => ({ ...prev, recipe_title, source }));
        setCategories(categories);
        setInstructions(instructions);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (formValues.category === "") {
      setDisabledCategory(true);
    } else {
      setDisabledCategory(false);
    }
  }, [formValues]);

  useEffect(() => {
    if (
      formValues.description === "" ||
      formValues.ingredientName === "" ||
      formValues.ingredientQuantity === ""
    ) {
      setDisabledIngredient(true);
    } else {
      setDisabledIngredient(false);
    }
  }, [formValues]);

  useEffect(() => {
    if (formValues.description === "") {
      setDisabledInstruction(true);
    } else {
      setDisabledInstruction(false);
    }
  }, [formValues]);

  useEffect(() => {
    if (formValues.recipe_title === "" || formValues.source === "") {
      setDisabledSubmit(true);
    } else {
      setDisabledSubmit(false);
    }
  }, [formValues]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddCategory = () => {
    setCategories([...categories, formValues.category]);
    setFormValues({ ...formValues, category: "" });
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        ingredient_name: formValues.ingredientName,
        quantity: formValues.ingredientQuantity,
      },
    ]);
    setFormValues({
      ...formValues,
      ingredientName: "",
      ingredientQuantity: "",
    });
  };

  const handleAddInstruction = () => {
    setInstructions([
      ...instructions,
      {
        step_number: formValues.step,
        description: formValues.description,
        ingredients,
      },
    ]);
    setIngredients([]);
    setFormValues({ ...formValues, step: "", description: "" });
  };

  const handleDeleteCategory = (category) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const handleDeleteIngredient = (ingredient) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const handleDeleteInstruction = (instruction) => {
    setInstructions(instructions.filter((i) => i !== instruction));
  };

  console.log(instructions);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const recipe = {
      recipe_title: formValues.recipe_title,
      source: formValues.source,
      categories,
      instructions,
    };

    dispatch(editRecipe(id, recipe));

    setFormValues(initialFormValues);
    setCategories([]);
    setInstructions([]);
    setIngredients([]);

    push("/recipes");
  };

  return (
    <StyledEditRecipe className="recipe-edit">
      <form onSubmit={handleSubmit}>
        <h2>Edit Recipe</h2>
        <div className="recipe-info">
          <h3>Recipe Info</h3>
          <label>
            Title
            <input
              type="text"
              name="recipe_title"
              value={formValues.recipe_title}
              onChange={handleChange}
            />
          </label>
          <label>
            Source
            <input
              type="text"
              name="source"
              value={formValues.source}
              onChange={handleChange}
            />
          </label>
          <label>
            Category
            <input
              type="text"
              name="category"
              value={formValues.category}
              onChange={handleChange}
            />
          </label>
          <button
            type="button"
            className="add-button"
            disabled={disabledCategory}
            onClick={handleAddCategory}
          >
            Add Category
          </button>
          {categories.map((category, idx) => {
            return (
              <div key={idx} className="added">
                <p>{category}</p>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteCategory(category)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>

        <div className="instructions">
          <h3>Instructions</h3>
          <div className="steps">
            <label>
              Description
              <input
                type="text"
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </label>
            <div className="ingredients">
              <label>
                Ingredient Name
                <input
                  type="text"
                  name="ingredientName"
                  value={formValues.ingredientName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Quantity
                <input
                  type="text"
                  name="ingredientQuantity"
                  value={formValues.ingredientQuantity}
                  onChange={handleChange}
                />
              </label>
              <button
                disabled={disabledIngredient}
                type="button"
                className="add-button"
                onClick={handleAddIngredient}
              >
                Add Ingredient
              </button>
              {ingredients.map((ingredient, idx) => {
                return (
                  <div key={idx} className="added">
                    <p>
                      Ingredient: {ingredient.ingredient_name}, Quantity:{" "}
                      {ingredient.quantity}
                    </p>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDeleteIngredient(ingredient)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className="add-button"
              disabled={disabledInstruction}
              onClick={handleAddInstruction}
            >
              Add Instruction
            </button>
            {instructions.map((instruction, idx) => {
              return (
                <div key={idx} className="added">
                  <div className="instruction-container">
                    <div>
                      <p>Step {instructions.indexOf(instruction) + 1}</p>
                      <p>{instruction.description}</p>
                      {instruction.ingredients &&
                        instruction.ingredients.map((ingredient, idx) => {
                          return (
                            <p key={idx}>
                              Ingredient: {ingredient.ingredient_name},
                              Quantity: {ingredient.quantity}
                            </p>
                          );
                        })}
                    </div>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDeleteInstruction(instruction)}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div></div>
        </div>
        <div className="submit">
          <button className="submit-button" disabled={disabledSubmit}>
            Save Recipe
          </button>
          <button onClick={() => push("/recipes")} className="back-button">
            Back
          </button>
        </div>
      </form>
    </StyledEditRecipe>
  );
}

const StyledEditRecipe = styled.div`
  display: flex;
  justify-content: center;
  padding: 5% 10%;
  color: #2e2e2e;

  form {
    text-align: center;
    padding: 1%;
    background-color: #7c9082;
    border-radius: 12px;
    box-shadow: 0px 0px 15px #37413a;
    width: 60%;
  }

  h2 {
    font-size: 3rem;
    margin: 3% 0 5% 0;
  }

  h3 {
    font-size: 2rem;
    text-align: left;
    margin: 4%;
  }

  label {
    font-size: 1.6rem;
    padding: 2% 2% 2% 6%;
    display: flex;
    justify-content: space-between;
    width: 90%;
  }

  input {
    width: 60%;
    font-size: 1.2rem;
    border: none;
    border-radius: 4px;
  }

  p {
    font-size: 1.2rem;
    font-style: italic;
    line-height: 1.4;
  }

  .added {
    margin: 2% auto;
    background-color: rgb(255, 255, 255, 0.1);
    border-radius: 12px;
    width: fit-content;
    padding: 1% 3%;
    box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
    display: flex;
  }

  .instruction-container {
    display: flex;
  }

  button {
    padding: 1% 3%;
    border: none;
    border-radius: 12px;
    color: #2e2e2e;
    background-color: #73b0cc;
    cursor: pointer;
    box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
    &:active {
      background-color: #558da7;
    }
    &:disabled {
      cursor: not-allowed;
      color: #818181;
    }
  }

  .add-button {
    margin: 4% 0 1% 0;
    font-size: 1.2rem;
  }

  .submit {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .submit-button {
    margin: 2% 0;
    font-size: 2rem;
    font-weight: bold;
    width: fit-content;
  }

  .back-button {
    width: fit-content;
    font-size: 1.2rem;
    background-color: #964e4e;
    margin-bottom: 2%;
    &:active {
      background-color: #773d3d;
    }
  }

  .delete-button {
    margin-left: 10px;
    font-size: 1rem;
    font-weight: bold;
    background-color: transparent;
    box-shadow: none;
    color: #2e2e2e;
  }
`;
