import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useDispatch } from "react-redux"
import schema from '../validation/loginSchema'
import { userLogin } from '../ store/user'

const initialFormValues = {
    username: '',
    password: ''
}

const initialFormErrors = {
    username: '',
    password: ''
}

const initialDisabled = true;

export default function Login() {

    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)

    const dispatch = useDispatch()
    const inputChange = (name, value) => {
        yup.reach(schema, name)
            .validate(value)
            .then(() => setFormErrors({...formErrors, [name]: ''}))
            .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
        setFormValues({...formValues, [name]: value})
    }

    const onChange = evt => {
        const {name, value} = evt.target
        inputChange(name, value)
    }

    const formSubmit = () => {
        dispatch(userLogin(formValues))
        // Add validation/URL location?
    }

   useEffect(() => {
       schema.isValid(formValues).then(valid => setDisabled(!valid))
   }, [formValues])

    return (
        <div>
            <form className='container' id='login-form' onSubmit={formSubmit}>
                <h2>Login</h2>
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