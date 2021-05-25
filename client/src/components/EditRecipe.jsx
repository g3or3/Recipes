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

export default function EditRecipe() {
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
        <div className="recipe-info">
          <h2>Recipe Info</h2>
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
        </div>

        <div className="instructions">
          <h2>Instructions</h2>
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
            </div>
            <button type="button" onClick={handleAddInstruction}>
              Add Instruction
            </button>
          </div>
        </div>
        <button>Submit Recipe</button>
      </form>
    </div>
  );
}
