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
  color: #2e2e2e;

  .container {
    text-align: center;
    padding: 1%;
    background-color: #7c9082;
    border-radius: 12px;
    box-shadow: 0px 0px 15px #37413a;
    width: 50%;
  }

  h2 {
    font-size: 3rem;
    margin: 2% 0 3% 0;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  label {
    font-size: 1.6rem;
    padding: 2%;
    display: flex;
    justify-content: space-between;
    width: 60%;
  }

  input {
    width: 60%;
    font-size: 1.2rem;
    border: none;
    border-radius: 4px;
  }

  button {
    margin: 2%;
    font-size: 1.4rem;
    padding: 1% 3%;
    border: none;
    border-radius: 12px;
    color: #2e2e2e;
    background-color: #73b0cc;
    cursor: pointer;
    box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
    &:disabled {
      cursor: not-allowed;
      color: #818181;
    }
    &:active {
      background-color: #558da7;
    }
  }

  .errors {
    font-size: 1.2rem;
    color: #bb0000;
    line-height: 1.2;
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
