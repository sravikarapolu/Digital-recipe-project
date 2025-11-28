import { useState } from 'react';
import { FaUtensils, FaBookOpen, FaHeart, FaShare, FaSearch, FaLock } from 'react-icons/fa';
import AuthModal from './AuthModal';

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleGetStarted = (mode = 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-caramel-50">
        {/* Navbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
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

              <div className="flex items-center gap-2 sm:gap-3">
                <button 
                  onClick={() => handleGetStarted('login')}
                  className="btn-outline text-sm"
                >
                  Login
                </button>
                <button 
                  onClick={() => handleGetStarted('signup')}
                  className="btn-primary text-sm"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-caramel-100 text-caramel-700 rounded-full text-sm font-medium mb-6">
              <FaHeart className="text-caramel-500" />
              Your Personal Recipe Companion
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brown-500 leading-tight mb-6">
              Save, Organize & Cook Your
              <span className="block text-caramel-600 mt-2">Favorite Recipes</span>
            </h1>

            <p className="text-lg sm:text-xl text-brown-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Build your digital cookbook, discover new dishes, and never lose a recipe again. 
              Perfect for home chefs, food bloggers, and families who love to cook.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => handleGetStarted('signup')}
                className="btn-primary text-lg px-8 py-4 w-full sm:w-auto shadow-xl hover:shadow-2xl"
              >
                Get Started Free
              </button>
              <button 
                onClick={() => handleGetStarted('login')}
                className="btn-outline text-lg px-8 py-4 w-full sm:w-auto"
              >
                Login to Your Account
              </button>
            </div>

            {/* Hero Image */}
            <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Recipe collection"
                className="w-full h-[300px] sm:h-[400px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-brown-500 mb-12">
              Why Choose RecipeNest?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-caramel-100 text-caramel-600 rounded-2xl mb-4 text-2xl">
                  <FaBookOpen />
                </div>
                <h3 className="text-xl font-semibold text-brown-500 mb-2">
                  Easy Organization
                </h3>
                <p className="text-brown-400 text-sm">
                  Store all your recipes in one place with smart categories and tags
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-caramel-100 text-caramel-600 rounded-2xl mb-4 text-2xl">
                  <FaSearch />
                </div>
                <h3 className="text-xl font-semibold text-brown-500 mb-2">
                  Quick Search
                </h3>
                <p className="text-brown-400 text-sm">
                  Find any recipe instantly with powerful search and filters
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-caramel-100 text-caramel-600 rounded-2xl mb-4 text-2xl">
                  <FaHeart />
                </div>
                <h3 className="text-xl font-semibold text-brown-500 mb-2">
                  Save Favorites
                </h3>
                <p className="text-brown-400 text-sm">
                  Mark your go-to recipes and access them quickly whenever you need
                </p>
              </div>

              {/* Feature 4 */}
              <div className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-caramel-100 text-caramel-600 rounded-2xl mb-4 text-2xl">
                  <FaLock />
                </div>
                <h3 className="text-xl font-semibold text-brown-500 mb-2">
                  Private & Secure
                </h3>
                <p className="text-brown-400 text-sm">
                  Your recipes are safely stored and only accessible to you
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-caramel-500 to-caramel-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Cooking?
            </h2>
            <p className="text-caramel-50 text-lg mb-8">
              Join RecipeNest today and organize your culinary journey
            </p>
            <button 
              onClick={() => handleGetStarted('signup')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-caramel-600 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              Create Free Account
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-neutral-200 bg-white/50">
          <div className="max-w-6xl mx-auto text-center text-brown-400 text-sm">
            <p>© 2025 RecipeNest. Made with <FaHeart className="inline text-red-500" /> for food lovers.</p>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default LandingPage;
