import { useRecipeStore } from "../store/recipeStore";

export default function DeleteRecipeButton({ id }) {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  return <button onClick={() => deleteRecipe(id)}>Delete</button>;
}
