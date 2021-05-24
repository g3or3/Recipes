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

    const inputChange = (name, value) => {
        // Add validation here
        setFormValues({...formValues, [name]: value})
    }

    const onChange = evt => {
        const {name, value} = evt.target
        inputChange(name, value)
    }

    const formSubmit = () => {
        const newUser = {
            username: formValues.username.trim(),
            password: formValues.password.trim()
        }
        createNewUser(newUser)
    }

    // Add useEffect for enabling/disabling submit button

    return (
        <div>
            <form className='container' id='new-user-form' onSubmit={formSubmit}>
                <div className='inputs'>
                    <label>Username
                        <input
                        type='text'
                        name='username'
                        value={formValues.username}
                        onChange={onChange}
                        />
                    </label>
                    <label>Password
                        <input
                        type='password'
                        name='password'
                        value={formValues.password}
                        onChange={onChange}
                        />
                    </label>
                </div>

                <div className='submit'>
                    <button disabled={disabled}>Submit</button>
                    <div className='errors'>
                        <div>{formErrors.username}</div>
                        <div>{formErrors.password}</div>
                    </div>
                </div>
            </form>
        </div>
    )
}