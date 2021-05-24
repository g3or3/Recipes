import React from 'react'

export default function Login() {

    const initialForm = {
        username: '',
        password: ''
    }

    const initialFormErrors = {
        username: '',
        password: ''
    }

    const initialDisabled = true

    const [form, setForm] = useState(initialForm)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)

    return (
        <div>
            <form className='container' id='login-form' onSubmit={null}>
                <div className='inputs'>
                    <label>Username
                        <input
                        type='text'
                        name='username'
                        value={form.name}
                        onChange={null}
                        />
                    </label>
                    <label>Password
                        <input
                        type='password'
                        name='password'
                        value={form.password}
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