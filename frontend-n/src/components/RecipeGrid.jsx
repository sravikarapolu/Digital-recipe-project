// src/components/RecipeGrid.jsx
import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import RecipeCard from "./RecipeCard";
import AddRecipeModal from "./AddRecipeModal";
import { useAuth } from "../context/AuthContext";

const RecipeGrid = ({ recipes = [], loading, onRecipeAdded, onRecipeDeleted, onRecipeUpdated, searchTerm = '', totalRecipes = 0 }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleRecipeAdded = (newRecipe) => {
    setShowAddModal(false);
    if (onRecipeAdded) {
      onRecipeAdded(newRecipe);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-20 text-brown-300">
        <FaUtensils className="text-5xl text-caramel-300 animate-pulse mx-auto mb-4" />
        <p>Loading recipes...</p>
      </div>
    );
  }

  // Empty state
  if (recipes.length === 0) {
    const isSearchActive = searchTerm && searchTerm.trim().length > 0;
    
    return (
      <>
        <div className="text-center py-20 text-brown-300 flex flex-col items-center gap-4">
          <FaUtensils className="text-5xl text-caramel-300" />

          <p className="text-lg font-display text-brown-400">
            {isSearchActive ? `No recipes match "${searchTerm}"` : 'No recipes found'}
          </p>

          <p className="text-brown-300">
            {isSearchActive 
              ? 'Try a different search term or clear the filter'
              : (isAuthenticated ? 'Start adding your favorite dishes!' : 'Sign in to add your recipes!')
            }
          </p>
          
          {isAuthenticated && !isSearchActive && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary mt-4"
            >
              + Add Your First Recipe
            </button>
          )}
        </div>
        
        <AddRecipeModal 
          isOpen={showAddModal} 
          onClose={() => setShowAddModal(false)}
          onRecipeAdded={handleRecipeAdded}
        />
      </>
    );
  }

  return (
    <>
      <div className="pt-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-brown-400">
              {searchTerm ? `Search Results` : 'Your Recipes'}
            </h2>
            <p className="text-xs text-brown-300">
              {recipes.length} recipe{recipes.length !== 1 && "s"} 
              {searchTerm && totalRecipes > recipes.length && ` (filtered from ${totalRecipes})`}
            </p>
            {searchTerm && (
              <p className="text-xs text-caramel-500 mt-1">
                Searching for: "{searchTerm}"
              </p>
            )}
          </div>

          {isAuthenticated && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-full border border-caramel-300 text-caramel-500 hover:bg-cream-100 transition flex items-center gap-2"
            >
              + Add new recipe
            </button>
          )}
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id || recipe._id || recipe.title} 
              recipe={recipe}
              onDelete={onRecipeDeleted}
              onUpdate={onRecipeUpdated}
            />
          ))}
        </div>
      </div>
      
      <AddRecipeModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        onRecipeAdded={handleRecipeAdded}
      />
    </>
  );
};

export default RecipeGrid;
