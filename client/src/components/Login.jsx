import React, { useState, useEffect } from 'react'

export default function Login() {

    const initialFormValues = {
        username: '',
        password: ''
    }

    const initialFormErrors = {
        username: '',
        password: ''
    }

    const initialDisabled = true;

    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)
    
    const inputChange = (name, value) => {
        // Add validation her
        yup.reach(schema, name)
        .validate(value)
        .then(() => {
            setFormErrors({
                ...formErrors,
                [name]: '',
            });
        })
        .catch((err) => {
            serFormErrors({
                ...formErrors,
                [name]: err.errors[0],
            });
        });

            setFormValues({...formValues, [name]: value}) ,
    });
    };

    const onChange = evt => {
        const {name, value} = evt.target
        inputChange(name, value)
    }

    const formSubmit = () => {
        const newLogin = {
          username: form.Values.username.trim(),
          password: form.Values.password.trim()
        };
        // Add validation/URL location?
    };

    // Add useEffect for enabling/disabling submit button

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
                        <div>{formErrors.name}</div>
                        <div>{formErrors.password}</div>
                    </div>
                </div>
            </form>
        </div>
    )
}