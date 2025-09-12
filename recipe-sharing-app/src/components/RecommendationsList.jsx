import { useRecipeStore } from "../store/recipeStore";

export default function RecommendationsList() {
  const recommendations = useRecipeStore((s) => s.recommendations);
  const generateRecommendations = useRecipeStore(
    (s) => s.generateRecommendations
  );

  return (
    <div>
      <h2>Recommended Recipes</h2>
      <button onClick={generateRecommendations}>Refresh Recommendations</button>
      {recommendations.length === 0 && <p>No recommendations yet!</p>}
      {recommendations.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
}
