import { useRecipeStore } from "../store/recipeStore";

export default function FavoritesList() {
  const favorites = useRecipeStore((s) =>
    s.favorites.map((id) => s.recipes.find((r) => r.id === id))
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 && <p>No favorites yet!</p>}
      {favorites.map((recipe) =>
        recipe ? (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ) : null
      )}
    </div>
  );
}
