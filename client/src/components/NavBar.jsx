import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../store/user";
import styled from "styled-components";
 
function NavBar() {
 const dispatch = useDispatch();
 const { push } = useHistory();
 
 const handleAdd = () => {
   push("/add-recipe");
 };
 
 const handleSearch = () => {
   push("/search");
 };
 
 const handleRecipes = () => {
   push("/recipes");
 };
 
 const handleLogout = () => {
   dispatch(logout());
   push("/login");
 };
 
 return (
   <StyledNavBar className="navbar">
     <button className="addRecipe" onClick={() => handleAdd()}>
       Add Recipe
     </button>
 
     <button className="my-recipes" onClick={() => handleRecipes()}>
       My Recipes
     </button>
 
     <button className="search-button" onClick={() => handleSearch()}>
       Search
     </button>
 
     <button onClick={() => handleLogout()} className="logout-button">
       Logout
     </button>
   </StyledNavBar>
 );
}
 
const StyledNavBar = styled.div`
 background-color: #7c9082;
 display: flex;
 justify-content: left;
 align-items: center;
 min-height: 5rem;
 
 button {
   background: none;
   border: none;
   padding: 1rem 2rem 1rem 2rem;
   font-size: 1.3rem;
   font: #2e2e2e;
   font-family: "Merriweather", serif;
 }
`;
 
export default NavBar;