import { useRecipeStore } from "../store/recipeStore";
import { useNavigate } from "react-router-dom";

export default function DeleteRecipeButton({ id }) {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(id);
    navigate("/"); // ✅ navigate back to home after delete
  };

  return <button onClick={handleDelete}>Delete</button>;
}
