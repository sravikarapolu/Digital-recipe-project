import React from 'react';
import { FaTimes, FaClock, FaUtensils, FaCarrot, FaEdit } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const RecipeViewModal = ({ recipe, isOpen, onClose, onEdit }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isOpen || !recipe) return null;

  const {
    title = 'Untitled Recipe',
    ingredients = [],
    steps = '',
    image,
    category,
    time,
    difficulty,
    tags = [],
    veg = true,
  } = recipe;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 text-brown-300 hover:text-brown-400 shadow-lg"
        >
          <FaTimes />
        </button>

        {/* Recipe Image */}
        {image && (
          <div className="relative h-64 w-full rounded-t-2xl overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex gap-2">
              {category && (
                <div className="bg-brown-400/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {category}
                </div>
              )}
              <div className="bg-white px-2 py-1 rounded-full shadow flex items-center justify-center">
                {veg ? (
                  <FaCarrot className="text-green-600" />
                ) : (
                  <FaUtensils className="text-red-500" />
                )}
              </div>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                {title}
              </h2>
            </div>
          </div>
        )}

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* No image fallback title */}
          {!image && (
            <h2 className="text-2xl font-bold text-brown-400 mb-4">
              {title}
            </h2>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-brown-300">
            {time && (
              <div className="flex items-center gap-2">
                <FaClock className="text-caramel-400" />
                <span>{time} mins</span>
              </div>
            )}
            {difficulty && (
              <div className="flex items-center gap-2">
                <FaUtensils className="text-caramel-400" />
                <span>{difficulty}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, idx) => (
                <span 
                  key={`${tag}-${idx}`} 
                  className="px-3 py-1 rounded-full bg-cream-200 text-sm text-brown-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-brown-400 mb-3 flex items-center gap-2">
              <span className="text-caramel-500">📋</span> Ingredients
            </h3>
            <ul className="space-y-2">
              {ingredients.map((ingredient, idx) => (
                <li 
                  key={idx} 
                  className="flex items-start gap-3 text-brown-300"
                >
                  <span className="text-caramel-400 mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
            {ingredients.length === 0 && (
              <p className="text-brown-200 italic">No ingredients listed</p>
            )}
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-lg font-semibold text-brown-400 mb-3 flex items-center gap-2">
              <span className="text-caramel-500">👨‍🍳</span> Instructions
            </h3>
            <div className="text-brown-300 whitespace-pre-wrap leading-relaxed">
              {steps || 'No instructions provided'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 p-4 rounded-b-2xl bg-cream-50">
          <div className="flex gap-3">
            {isAuthenticated && recipe._id && onEdit && (
              <button
                onClick={onEdit}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
              >
                <FaEdit /> Edit Recipe
              </button>
            )}
            <button
              onClick={onClose}
              className={`${isAuthenticated && recipe._id && onEdit ? 'flex-1' : 'w-full'} btn-primary`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeViewModal;
