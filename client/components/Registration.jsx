import React, { useState } from 'react'

export default function Registration() {

    const initialNewUser = {
        username: '',
        password: ''
    }

    const initialFormErrors = {
        username: '',
        password: ''
    }

    const [newUser, setNewUser] = useState(initialNewUser)
    const [formErrors, setFormErrors] = useState(initialFormErrors)

    return (
        <div>
            <form className='container' id='new-user-form' onSubmit={null}>
                <div className='inputs'>
                    <label>Username
                        <input
                        type='text'
                        name='username'
                        value={newUser.name}
                        onChange={null}
                        />
                    </label>
                    <label>Password
                        <input
                        type='password'
                        name='password'
                        value={newUser.password}
                        onChange={null}
                        />
                    </label>
                </div>

                <div className='submit'>
                    <button disabled={null}>Submit</button>
                    <div className='errors'>
                        <div>{formErrors.name}</div>
                        <div>{formErrors.password}</div>
                    </div>
                </div>
            </form>
        </div>
    )
}