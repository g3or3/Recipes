import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import schema from "../validation/loginSchema";
import { userRegister } from "../ store/user";
import { useHistory } from "react-router";
import styled from "styled-components";

const StyledRegistration = styled.div`
  display: flex;
  justify-content: center;
  padding: 10%;

  .container {
    text-align: center;
    padding: 2%;
    background-color: #a7a284;
  }

  h2 {
    font-size: 3rem;
  }
`;

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

export default function Registration() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  const { push } = useHistory();
  const { loading, registerSuccess } = useSelector((state) => state.users);
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

    dispatch(userRegister(formValues));
    setFormValues(initialFormValues);
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  useEffect(() => {
    if (registerSuccess) push("/login");
  }, [registerSuccess, push]);

  return (
    <StyledRegistration>
      <form className="container" id="new-user-form" onSubmit={formSubmit}>
        <h2>Register</h2>
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
    </StyledRegistration>
  );
}
