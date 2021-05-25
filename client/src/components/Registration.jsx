import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from 'yup'
import schema from '../validation/loginSchema'

export default function Registration() {
	const initialFormValues = {
		username: "",
		password: "",
	};

	const initialFormErrors = {
		username: "",
		password: "",
	};

	const initialDisabled = true;

	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(initialDisabled);

    const validate = (name, value) => {
        yup.reach(schema, name)
            .validate(value)
            .then(() => setFormErrors({...formErrors, [name]: ''}))
            .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
    }

	const inputChange = (name, value) => {
		validate(name, value)
		setFormValues({ ...formValues, [name]: value });
	};

	const onChange = (evt) => {
		const { name, value } = evt.target;
		inputChange(name, value);
	};

	const formSubmit = () => {};

    useEffect(() => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
    })

	return (
		<div>
			<form className="container" id="new-user-form" onSubmit={formSubmit}>
                <h2>Register</h2>
				<div className="inputs">
					<label>
						Username
						<input
							type="text"
							name="username"
							value={formValues.username}
							onChange={onChange}
						/>
					</label>
					<label>
						Password
						<input
							type="password"
							name="password"
							value={formValues.password}
							onChange={onChange}
						/>
					</label>
				</div>

				<div className="submit">
					<button disabled={disabled}>Submit</button>
					<div className="errors">
						<div>{formErrors.username}</div>
						<div>{formErrors.password}</div>
					</div>
				</div>
			</form>
		</div>
	);
}
