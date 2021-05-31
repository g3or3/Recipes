import React from "react";
import { useHistory } from "react-router";
import NavBar from "./NavBar";
import styled from "styled-components";

export default function EmptyLandingPage() {
  const { push } = useHistory();

  const handleAdd = () => {
    push("/add-recipe");
  };
  return (
    <StyledEmpty>
      <NavBar />
      <div className="container" id="empty">
        <h2>You don't have any recipes yet!</h2>
        <button onClick={() => handleAdd()}>Create your first recipe</button>
      </div>
    </StyledEmpty>
  );
}

const StyledEmpty = styled.div`
  .container {
    text-align: center;
    padding: 1%;
    background-color: ${(props) => props.theme.backButtonColor};
    border-radius: 12px;
    box-shadow: 0px 0px 15px #37413a;
    width: 40%;
    margin: 10% auto;
  }

  h2 {
    font-size: 2.6rem;
    padding: 2%;
    font-style: italic;
  }

  button {
    padding: 1% 3%;
    margin: 2%;
    font-size: 1.6rem;
    border: none;
    border-radius: 12px;
    color: #2e2e2e;
    background-color: ${(props) => props.theme.secondaryColor};
    cursor: pointer;
    box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
    &:active {
      background-color: #558da7;
    }
  }
`;
