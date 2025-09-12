import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";

export default function App() {
  return (
    <BrowserRouter>
      <h1>Recipe Sharing App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddRecipeForm />
              <SearchBar />
              <RecipeList />
              <FavoritesList />
              <RecommendationsList />
            </>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
