import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../ store/recipe";


export default function RecipeDisplay() {
  const recipes = useSelector((state) => state.recipes.recipeList);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [dispatch])

  return (
    <>
    {/* need to transfer recipe data but eyes be blurring and too many {({()})} */}
    </>
  )
}