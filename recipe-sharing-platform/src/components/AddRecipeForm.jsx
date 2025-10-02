import { useState } from "react";
import { Link } from "react-router-dom";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title || !ingredients || !steps) {
      setError("⚠️ All fields are required.");
      return;
    }
    if (ingredients.split("\n").length < 2) {
      setError("⚠️ Please add at least 2 ingredients.");
      return;
    }

    setError("");
    const newRecipe = { title, ingredients, steps };
    console.log("Recipe submitted:", newRecipe);

    // Clear form after submit
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link to="/" className="inline-block mb-6 text-green-600 hover:underline">
        ← Back to Recipes
      </Link>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">➕ Add a New Recipe</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Recipe Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
              placeholder="Enter recipe title"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Ingredients</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
              rows="4"
              placeholder="List ingredients (one per line)"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Preparation Steps</label>
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
              rows="5"
              placeholder="Describe the steps"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeForm;
