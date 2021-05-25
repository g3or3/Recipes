import React, { useState } from 'react'

export default function EditRecipe() {

    const initialFormValues = {
        title: {recipe.recipe_title},
        source: {recipe.source},
        category: {recipe.categories},
        step: {instruction.step_number},
        description: {instruction.description},
        ingredientName: {ingredient.ingredient_name},
        ingredientQuantity: {ingredient.quantity}
    }

    const [formValues, setFormValues] = useState(initialFormValues)

    const inputChange = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }

    const onChange = evt => {
        const {name, value} = evt.target
        inputChange(name, value)
    }

    return (
        <div>
            
        </div>
    )
}
