// src/App.jsx
import { useState, useEffect } from "react";
import { FaUtensils } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SidebarFilters from "./components/SidebarFilters";
import RecipeGrid from "./components/RecipeGrid";
import LandingPage from "./components/LandingPage";
import { useAuth } from "./context/AuthContext";
import { recipeAPI } from "./services/api";

/* ---------------- MOCK RECIPES: existing + 3 newly added ---------------- */
const MOCK_RECIPES = [
  {
    id: 1,
    title: "Creamy Paneer Butter Masala",
    category: "Dinner",
    time: 40,
    difficulty: "Intermediate",
    rating: 4.8,
    tags: ["Indian", "Vegetarian"],
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1200",
    veg: true,
  },
  {
    id: 2,
    title: "Classic Margherita Pizza",
    category: "Lunch",
    time: 25,
    difficulty: "Easy",
    rating: 4.5,
    tags: ["Italian", "Vegetarian"],
    image: "https://images.pexels.com/photos/1596888/pexels-photo-1596888.jpeg?auto=compress&cs=tinysrgb&w=1200",
    veg: true,
  },
  {
    id: 3,
    title: "Overnight Oats with Fruits",
    category: "Breakfast",
    time: 10,
    difficulty: "Easy",
    rating: 4.2,
    tags: ["Healthy", "Vegetarian"],
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1200",
    veg: true,
  },
  {
    id: 4,
    title: "Spicy Chicken Tikka Wraps",
    category: "Lunch",
    time: 30,
    difficulty: "Intermediate",
    rating: 4.6,
    tags: ["Indian", "Non-Veg", "Street Food"],
    image: "https://images.pexels.com/photos/4611989/pexels-photo-4611989.jpeg?auto=compress&cs=tinysrgb&w=1200",
    veg: false,
  },
  {
    id: 5,
    title: "Caramel Banana Pancakes",
    category: "Breakfast",
    time: 20,
    difficulty: "Easy",
    rating: 4.7,
    tags: ["Breakfast", "Sweet"],
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1200",
    veg: true,
  },
  {
    id: 6,
    title: "Mango Lassi Cheesecake (No Bake)",
    category: "Dessert",
    time: 60,
    difficulty: "Intermediate",
    rating: 4.9,
    tags: ["Dessert", "Fusion"],
    image: "https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=1200",
    veg: true,
  },

  /* ---- three MORE recipes you asked to add now ---- */
  {
    id: 7,
    title: "Herbed Lemon Salmon",
    category: "Dinner",
    time: 28,
    difficulty: "Easy",
    rating: 4.7,
    tags: ["Seafood", "Healthy"],
    image: "https://images.pexels.com/photos/46239/salmon-dish-food-healthy-46239.jpeg?auto=compress&cs=tinysrgb&w=1200",
    veg: false,
  },
  {
    id: 8,
    title: "Roasted Vegetable Buddha Bowl",
    category: "Lunch",
    time: 35,
    difficulty: "Easy",
    rating: 4.6,
    tags: ["Vegan", "Healthy"],
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
    veg: true,
  },
  {
    id: 9,
    title: "Chocolate Lava Cake",
    category: "Dessert",
    time: 25,
    difficulty: "Intermediate",
    rating: 4.9,
    tags: ["Dessert", "Chocolate"],
    image: "https://images.pexels.com/photos/4109996/pexels-photo-4109996.jpeg?auto=compress&cs=tinysrgb&w=1200",
    veg: true,
  },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Fetch recipes from backend when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchRecipes();
    }
  }, [isAuthenticated]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeAPI.getAll();
      // Set recipes from backend, even if empty
      setRecipes(response.data || []);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      // Set empty array on error instead of mock data
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeAdded = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const handleRecipeDeleted = async (recipeId) => {
    try {
      await recipeAPI.delete(recipeId);
      setRecipes(recipes.filter((r) => r._id !== recipeId));
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };

  const handleRecipeUpdated = (updatedRecipe) => {
    setRecipes(recipes.map(r => r._id === updatedRecipe._id ? updatedRecipe : r));
  };

  const filteredRecipes = recipes.filter((r) => {
    const matchesCategory =
      selectedCategory === "All" || r.category === selectedCategory;
    
    // If no search term, just filter by category
    if (!searchTerm.trim()) {
      return matchesCategory;
    }
    
    const lower = searchTerm.toLowerCase().trim();
    const matchesSearch =
      r.title?.toLowerCase().includes(lower) ||
      (r.tags || []).some((t) => t?.toLowerCase().includes(lower)) ||
      (r.ingredients || []).some((ing) => ing?.toLowerCase().includes(lower)) ||
      r.steps?.toLowerCase().includes(lower);
    
    return matchesCategory && matchesSearch;
  });

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-caramel-500 rounded-full mb-4 animate-pulse">
            <FaUtensils className="text-white text-2xl" />
          </div>
          <p className="text-brown-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // Show main app if authenticated
  return (
    <div className="app-watermark min-h-screen">
      {/* Option B overlay: uncomment to enable fixed centered overlay */}
      <div className="fixed-watermark-overlay pointer-events-none">
        <img src="/recipebook_logo.jpg" alt="RecipeNest watermark" style={{ width: 520, opacity: 0.10, filter: 'blur(.3px)'}} />
      </div>

      <div className="app-content relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <Hero 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          onRecipeAdded={handleRecipeAdded}
        />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 shrink-0">
              <SidebarFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </aside>

            {/* Recipe Grid */}
            <section className="flex-1 min-w-0">
              <RecipeGrid 
              recipes={filteredRecipes} 
              loading={loading}
              searchTerm={searchTerm}
              totalRecipes={recipes.length}
              onRecipeAdded={handleRecipeAdded}
              onRecipeDeleted={handleRecipeDeleted}
              onRecipeUpdated={handleRecipeUpdated}
              />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
