import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosWithAuth } from "../auth/axiosWithAuth";
import styled from "styled-components";

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
  }

  .add-button {
    margin: 4% 0 1% 0;
    font-size: 1.2rem;
  }

  .submit-button {
    margin: 4%;
    font-size: 2rem;
    font-weight: bold;
  }

  .delete-button {
    /* padding: 5%; */
    margin-left: 10px;
    font-size: 1rem;
    font-weight: bold;
    background-color: transparent;
    box-shadow: none;
    color: #2e2e2e;
  }
`;

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
  const [disabled, setDisabled] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosWithAuth().get(`api/recipes/${id}`);
        const { recipe_title, source, categories, instructions } = data;
        console.log(data);
        setFormValues((prev) => ({ ...prev, recipe_title, source }));
        setCategories(categories);
        setInstructions(instructions);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (formValues.step === "" || formValues.description === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
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

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const recipe = {
      recipe_title: formValues.recipe_title,
      source: formValues.source,
      categories,
      instructions,
    };
    console.log(recipe);
    setFormValues(initialFormValues);
    setCategories([]);
    setInstructions([]);
    setIngredients([]);
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
            onClick={handleAddCategory}
          >
            Add Category
          </button>
          {categories.map((category, idx) => {
            return (
              <div className="added">
                <p key={idx}>{category}</p>
                <button className="delete-button">X</button>
              </div>
            );
          })}
        </div>

        <div className="instructions">
          <h3>Instructions</h3>
          <div className="steps">
            <label>
              Step Number
              <input
                type="text"
                name="step"
                value={formValues.step}
                onChange={handleChange}
              />
            </label>
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
                disabled={disabled}
                type="button"
                className="add-button"
                onClick={handleAddIngredient}
              >
                Add Ingredient
              </button>
              {ingredients.map((ingredient, idx) => {
                return (
                  <div className="added">
                    <p key={idx}>
                      Ingredient: {ingredient.ingredient_name}, Quantity:{" "}
                      {ingredient.quantity}
                    </p>
                    <button className="delete-button">X</button>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className="add-button"
              onClick={handleAddInstruction}
            >
              Add Instruction
            </button>
            {instructions.map((instruction, idx) => {
              return (
                <div className="added">
                  <div key={idx} className="instruction-container">
                    <p>Step {instruction.step_number}</p>
                    <p>{instruction.description}</p>
                    {instruction.ingredients?.map((ingredient, idx) => {
                      return (
                        <p key={idx}>
                          Ingredient: {ingredient.ingredient_name}, Quantity:{" "}
                          {ingredient.quantity}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div></div>
        </div>
        <button className="submit-button">Save Recipe</button>
      </form>
    </StyledEditRecipe>
  );
}
