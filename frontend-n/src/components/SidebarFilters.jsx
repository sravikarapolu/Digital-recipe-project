// src/components/SidebarFilters.jsx

import { FaBreadSlice, FaPizzaSlice, FaCoffee, FaIceCream } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Dessert"];

// Map category → icon
const iconMap = {
  All: <GiKnifeFork />,
  Breakfast: <FaBreadSlice />,
  Lunch: <FaPizzaSlice />,
  Dinner: <GiKnifeFork />,
  Snacks: <FaPizzaSlice />,
  Dessert: <FaIceCream />,
};

const SidebarFilters = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <>
      {/* Mobile Horizontal Scroll */}
      <div className="lg:hidden mb-6">
        <p className="text-xs font-semibold text-brown-400 uppercase tracking-widest mb-3 px-1">
          Filter by Category
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-caramel-500 text-white shadow-md scale-105"
                  : "bg-white border-2 border-neutral-200 text-brown-400 hover:border-caramel-300 shadow-sm"
              }`}
            >
              {iconMap[cat]}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block card sticky top-24">
        <p className="text-xs font-semibold text-brown-400 uppercase tracking-widest mb-3">
          Filter
        </p>

        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-caramel-500 to-caramel-600 text-white shadow-md scale-[1.02]"
                  : "border-2 border-neutral-200 text-brown-400 hover:bg-cream-50 hover:border-caramel-300"
              }`}
            >
              {/* LEFT SIDE → Icon + Text */}
              <span className="flex items-center gap-2.5">
                {iconMap[cat]}
                {cat}
              </span>

              {/* RIGHT SIDE → Optional indicator bullet */}
              {selectedCategory === cat && <span className="text-lg">•</span>}
            </button>
          ))}
        </div>

        <div className="mt-6 border-t border-neutral-200 pt-4">
          <p className="text-xs font-semibold text-brown-400 mb-2">Coming soon</p>
          <ul className="text-xs text-brown-300 space-y-1.5">
            <li className="flex items-center gap-2">
              <span className="text-caramel-400">•</span>
              Filter by cooking time
            </li>
            <li className="flex items-center gap-2">
              <span className="text-caramel-400">•</span>
              Filter by difficulty
            </li>
            <li className="flex items-center gap-2">
              <span className="text-caramel-400">•</span>
              Favourite recipes
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarFilters;
