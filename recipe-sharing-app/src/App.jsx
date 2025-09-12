import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";

export default function App() {
  return (
    <div>
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}
