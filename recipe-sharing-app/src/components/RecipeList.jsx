import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";

export default function RecipeList() {
  const recipes = useRecipeStore((s) =>
    s.searchTerm ? s.filteredRecipes : s.recipes
  );

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 && <p>No recipes found!</p>}
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <h3>{recipe.title}</h3>
          </Link>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
}
