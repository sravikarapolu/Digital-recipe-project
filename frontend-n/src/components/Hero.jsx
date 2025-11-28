// src/components/Hero.jsx
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import AddRecipeModal from "./AddRecipeModal";
import AuthModal from "./AuthModal";

const Hero = ({ searchTerm, setSearchTerm, onRecipeAdded }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleCreateRecipe = () => {
    if (isAuthenticated) {
      setShowAddModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleRecipeAdded = (newRecipe) => {
    setShowAddModal(false);
    if (onRecipeAdded) {
      onRecipeAdded(newRecipe);
    }
  };
  return (
    <section className="w-full border-b bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Text Content */}
          <div className="max-w-2xl">
            <p className="kicker text-caramel-600">Digital Recipe Book</p>

            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-brown-500">
              Save, organize & cook your favourite recipes beautifully.
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-brown-400 max-w-lg leading-relaxed">
              Search across your personal cookbook, filter by category and cook with confidence.
              Built for home chefs, food bloggers and families.
            </p>

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button onClick={handleCreateRecipe} className="btn-primary w-full sm:w-auto">
                Create recipe
              </button>
              <button className="btn-outline w-full sm:w-auto" disabled title="Coming soon">
                Import
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="w-full max-w-md lg:max-w-lg">
            <label htmlFor="hero-search" className="text-sm font-semibold text-brown-400 mb-2 block">
              Search recipes
            </label>

            <div className="flex items-center gap-3 rounded-2xl border-2 border-neutral-300 bg-white px-4 sm:px-5 py-3 sm:py-3.5 shadow-md hover:shadow-lg transition-all focus-within:border-caramel-400 focus-within:ring-2 focus-within:ring-caramel-200">
              <span className="text-brown-300 text-lg" aria-hidden="true">
                <FaSearch />
              </span>

              <input
                id="hero-search"
                type="text"
                placeholder="Try 'paneer', 'breakfast', 'pasta'..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search recipes"
                className="flex-1 bg-transparent text-brown-400 placeholder:text-brown-300 outline-none text-sm sm:text-base"
              />

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-brown-300 hover:text-brown-400 transition"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddRecipeModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onRecipeAdded={handleRecipeAdded}
      />
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </section>
  );
};

export default Hero;
