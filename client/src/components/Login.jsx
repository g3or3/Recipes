import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import schema from "../validation/loginSchema";
import { userLogin } from "../ store/user";
import { useHistory } from "react-router";

const initialFormValues = {
	username: "",
	password: "",
};

const initialFormErrors = {
	username: "",
	password: "",
};

export default function Login() {
	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(true);

	const { push } = useHistory();
	const { loading, loginSuccess } = useSelector((state) => state.users);
	const dispatch = useDispatch();

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		yup
			.reach(schema, name)
			.validate(value)
			.then(() => setFormErrors({ ...formErrors, [name]: "" }))
			.catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
		setFormValues({ ...formValues, [name]: value });
	};

	const formSubmit = (evt) => {
		evt.preventDefault();

		dispatch(userLogin(formValues));
		setFormValues(initialFormValues);
	};

	useEffect(() => {
		schema.isValid(formValues).then((valid) => setDisabled(!valid));
	}, [formValues]);

	useEffect(() => {
		if (loginSuccess) push("/recipes");
	}, [loginSuccess, push]);

	return (
		<div>
			<form className="container" id="login-form" onSubmit={formSubmit}>
				<h2>Login</h2>
				<div className="inputs">
					<label>
						Username
						<input
							type="text"
							name="username"
							value={formValues.username}
							onChange={handleChange}
						/>
					</label>
					<label>
						Password
						<input
							type="password"
							name="password"
							value={formValues.password}
							onChange={handleChange}
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
