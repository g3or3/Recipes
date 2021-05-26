import React from 'react'

// Needs link to new recipe creation component

export default function EmptyLandingPage() {

    return (
        <div className='container' id='empty'>
            <h2>You don't have any recipes yet!</h2>
            <a href='#'>Create your first recipe</a>
        </div>
    )
}
