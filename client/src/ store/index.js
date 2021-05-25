import { configureStore } from "@reduxjs/toolkit";
import recipes from "./recipe";

export const store = configureStore({ reducer: recipes });
