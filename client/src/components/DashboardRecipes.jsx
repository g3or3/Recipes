import React from 'react'


export default function DashboardRecipes() {
  const recipes = [
    {
      "recipe_id": 1,
      "recipe_title": "Bacon Omelette",
      "source": "The Cooking Channel",
      "categories": [
          "Breakfast"
      ],
      "instructions": [
          {
              "step_number": 1,
              "description": "Cook eggs.",
              "ingredients": [
                  {
                      "ingredient_id": 2,
                      "ingredient_name": "Eggs",
                      "quantity": 4
                  },
                  {
                      "ingredient_id": 1,
                      "ingredient_name": "Cheese",
                      "quantity": 3
                  }
              ]
          },
          {
              "step_number": 2,
              "description": "Add bacon.",
              "ingredients": [
                  {
                      "ingredient_id": 3,
                      "ingredient_name": "Bacon",
                      "quantity": 2
                  }
              ]
          },
          {
              "step_number": 3,
              "description": "Enjoy your omelette.",
              "ingredients": null
          }
      ]
  },
  {
    "recipe_id": 2,
    "recipe_title": "pesto pasta",
    "source": "The Cooking Channel",
    "categories": [
        "Breakfast"
    ],
    "instructions": [
        {
            "step_number": 1,
            "description": "Cook eggs.",
            "ingredients": [
                {
                    "ingredient_id": 2,
                    "ingredient_name": "Eggs",
                    "quantity": 4
                },
                {
                    "ingredient_id": 1,
                    "ingredient_name": "Cheese",
                    "quantity": 3
                }
            ]
        },
        {
            "step_number": 2,
            "description": "Add bacon.",
            "ingredients": [
                {
                    "ingredient_id": 3,
                    "ingredient_name": "Bacon",
                    "quantity": 2
                }
            ]
        },
        {
            "step_number": 3,
            "description": "Enjoy your omelette.",
            "ingredients": null
        }
    ]
  },
  {
    "recipe_id": 3,
    "recipe_title": "Bacon",
    "source": "The Cooking Channel",
    "categories": [
        "Breakfast"
    ],
    "instructions": [
        {
            "step_number": 1,
            "description": "Cook eggs.",
            "ingredients": [
                {
                    "ingredient_id": 2,
                    "ingredient_name": "Eggs",
                    "quantity": 4
                },
                {
                    "ingredient_id": 1,
                    "ingredient_name": "Cheese",
                    "quantity": 3
                }
            ]
        },
        {
            "step_number": 2,
            "description": "Add bacon.",
            "ingredients": [
                {
                    "ingredient_id": 3,
                    "ingredient_name": "Bacon",
                    "quantity": 2
                }
            ]
        },
        {
            "step_number": 3,
            "description": "Enjoy your omelette.",
            "ingredients": null
        }
    ]
  },
  ]

  return (
    <>
    <div className="recipes-container">
      <div className="recipe-card">
        {recipes?.map((recipe) => (
          <div className="individual-recipe" key={recipe.recipe_id}>
            <h2>{recipe.recipe_title}</h2>
            <p>
            
            {recipe.source}
            {recipe.categories}
            {recipe.instructions?.map((instruction) => {
              <p>
                  {instruction.step_number}
                  {instruction.description}
                  
              </p>
            })}
            
            </p>
          </div>

  ))}
      </div>
    </div>
    </>
  )
}