export const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === id ? { ...r, ...updatedRecipe } : r
      ),
    })),
  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),
  setSearchTerm: (term) =>
    set((state) => {
      const filtered = state.recipes.filter((r) =>
        r.title.toLowerCase().includes(term.toLowerCase())
      );
      return { searchTerm: term, filteredRecipes: filtered };
    }),
  addFavorite: (id) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, id])],
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((fid) => fid !== id),
    })),
  generateRecommendations: () =>
    set((state) => {
      // Very simple mock: recommend random non-favorites
      const recommended = state.recipes.filter(
        (r) => !state.favorites.includes(r.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),
}));
