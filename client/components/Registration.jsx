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

    const initialDisabled = true

    const [newUser, setNewUser] = useState(initialNewUser)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)

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
                    <button disabled={disabled}>Submit</button>
                    <div className='errors'>
                        <div>{formErrors.name}</div>
                        <div>{formErrors.password}</div>
                    </div>
                </div>
            </form>
        </div>
    )
}