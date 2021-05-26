import React, { useState } from "react";

const initialFormValues = {
  recipe_title: "",
  source: "",
  category: "",
  step: "",
  description: "",
  ingredientName: "",
  ingredientQuantity: "",
};

export default function AddRecipe() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

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
    <div className="recipe-edit">
      <form onSubmit={handleSubmit}>
        <h2>Add Recipe</h2>
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
          <button type="button" onClick={handleAddCategory}>
            Add Category
          </button>
          {categories.map((category, idx) => {
            return <p key={idx}>{category}</p>;
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
              <button type="button" onClick={handleAddIngredient}>
                Add Ingredient
              </button>
              {ingredients.map((ingredient, idx) => {
                return (
                  <p key={idx}>
                    Ingredient: {ingredient.ingredient_name}, Quantity:{" "}
                    {ingredient.quantity}
                  </p>
                );
              })}
            </div>
            <button type="button" onClick={handleAddInstruction}>
              Add Instruction
            </button>
            {instructions.map((instruction, idx) => {
              return (
                <div key={idx} className="instruction-container">
                  <p>Step {instruction.step_number}</p>
                  <p>{instruction.description}</p>
                  {instruction.ingredients.map((ingredient, idx) => {
                    return (
                      <p key={idx}>
                        Ingredient: {ingredient.ingredient_name}, Quantity:{" "}
                        {ingredient.quantity}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <button>Submit Recipe</button>
      </form>
    </div>
  );
}
