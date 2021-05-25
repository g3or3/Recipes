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
        <div className='recipe-edit'>
            <form>
                <div className='recipe-info'>
                    <h2>Recipe Info</h2>
                    <label>Title</label>
                        <input
                        type='text'
                        name='title'
                        value={formValues.title}
                        onChange={onChange}
                        />
                    <label>Source</label>
                        <input
                        type='text'
                        name='source'
                        value={formValues.source}
                        onChange={onChange}
                        />
                    <label>Category</label>
                        <input
                        type='text'
                        name='category'
                        value={formValues.category}
                        onChange={onChange}
                        />
                </div>

                <div className='instructions'>
                    <h2>Instructions</h2>
                </div>
            </form>
        </div>
    )
}
