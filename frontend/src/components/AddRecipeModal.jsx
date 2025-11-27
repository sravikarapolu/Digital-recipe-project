import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { recipeAPI } from '../services/api';

const AddRecipeModal = ({ isOpen, onClose, onRecipeAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert ingredients string to array
      const ingredientsArray = formData.ingredients
        .split('\n')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      if (ingredientsArray.length === 0) {
        setError('Please add at least one ingredient');
        setLoading(false);
        return;
      }

      const recipeData = {
        title: formData.title,
        ingredients: ingredientsArray,
        steps: formData.steps,
        image: formData.image || undefined,
      };

      const response = await recipeAPI.create(recipeData);
      
      if (onRecipeAdded) {
        onRecipeAdded(response.data);
      }
      
      setFormData({ title: '', ingredients: '', steps: '', image: '' });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brown-300 hover:text-brown-400"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-semibold text-brown-400 mb-6">
          Add New Recipe
        </h2>

        {error && (
          <div className="p-3 rounded-lg mb-4 text-sm bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brown-400 mb-1">
              Recipe Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel-400"
              placeholder="e.g., Creamy Paneer Butter Masala"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-400 mb-1">
              Ingredients * (one per line)
            </label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel-400 resize-none"
              placeholder="2 cups paneer, cubed&#10;1 cup tomato puree&#10;1 tsp garam masala&#10;Salt to taste"
            />
            <p className="text-xs text-brown-300 mt-1">
              Press Enter after each ingredient
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-400 mb-1">
              Steps/Instructions *
            </label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              required
              rows={8}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel-400 resize-none"
              placeholder="1. Heat oil in a pan...&#10;2. Add spices and sauté...&#10;3. Pour tomato puree..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-400 mb-1">
              Image URL (optional)
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel-400"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div className="mt-2 rounded-lg overflow-hidden border border-neutral-200">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 border border-neutral-200 rounded-lg text-brown-400 hover:bg-cream-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeModal;
