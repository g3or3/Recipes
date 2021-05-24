import React, { useState } from 'react'
import axios from 'axios'

export default function Registration() {

    const initialFormValues = {
        username: '',
        password: ''
    }

    const initialFormErrors = {
        username: '',
        password: ''
    }

    const initialUsers = [];
    const initialDisabled = true;

    const [users, setUsers] = useState(initialUsers)
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)

    const createNewUser = newUser => {
        axios.post({/*Add endpoint*/}, newUser)
            .then(res => {
                setUsers([res.data, ...users])
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setFormValues(initialFormValues)
            })
    }

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