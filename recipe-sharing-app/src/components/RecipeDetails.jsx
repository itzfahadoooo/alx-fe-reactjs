import { useParams, Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

export default function RecipeDetails() {
  const { id } = useParams();
  const recipe = useRecipeStore((s) =>
    s.recipes.find((r) => r.id === Number(id))
  );
  const addFavorite = useRecipeStore((s) => s.addFavorite);

  if (!recipe) return <p>Recipe not found!</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <button onClick={() => addFavorite(recipe.id)}>Add to Favorites</button>
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton id={recipe.id} />
      <Link to="/">Back</Link>
    </div>
  );
}
