// src/components/Navbar.jsx
import { useState } from "react";
import { FaUtensils, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo + Icon */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-caramel-500 to-caramel-600 flex items-center justify-center text-white text-lg sm:text-xl shadow-md">
                <FaUtensils />
              </div>
              <div>
                <p className="font-bold text-base sm:text-lg text-brown-500">
                  RecipeNest
                </p>
                <p className="text-xs text-brown-300 hidden sm:block">Digital Recipe Book</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2 sm:gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-brown-400 hidden lg:inline-block max-w-[200px] truncate px-3 py-1.5 bg-cream-100 rounded-full">
                    {user?.email}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border-2 border-caramel-400 text-caramel-600 bg-white hover:bg-caramel-50 transition font-medium text-sm shadow-sm hover:shadow-md"
                    title={user?.email}
                  >
                    <FaSignOutAlt className="text-base" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="btn-primary text-sm sm:text-base"
                >
                  Sign in
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Navbar;
