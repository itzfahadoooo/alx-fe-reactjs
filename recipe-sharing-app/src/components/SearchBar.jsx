import { useRecipeStore } from "../store/recipeStore";

export default function SearchBar() {
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  );
}
