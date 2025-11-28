// src/components/RecipeCard.jsx
import React, { useState } from "react";
import { FaClock, FaCarrot, FaUtensils, FaTrash, FaEye, FaEdit } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import RecipeViewModal from "./RecipeViewModal";
import EditRecipeModal from "./EditRecipeModal";

const RecipeCard = ({ recipe = {}, onDelete, onUpdate }) => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { isAuthenticated } = useAuth();

  const {
    _id,
    image = "https://via.placeholder.com/1200x800?text=No+image",
    title = "Untitled",
    category = "",
    rating = "-",
    time = "-",
    difficulty = "Unknown",
    tags = [],
    veg = true,
    ingredients = [],
    steps = "",
  } = recipe || {};

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setDeleting(true);
      try {
        if (onDelete && _id) {
          await onDelete(_id);
        }
      } catch (error) {
        console.error('Failed to delete recipe:', error);
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleUpdate = (updatedRecipe) => {
    setShowEditModal(false);
    if (onUpdate) {
      onUpdate(updatedRecipe);
    }
  };

  return (
    <>
      <article 
        onClick={() => setShowViewModal(true)}
        className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-card hover:shadow-hover hover:-translate-y-1 transition transform flex flex-col cursor-pointer group"
      >
      <div className="relative h-44 w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {category && (
          <div className="absolute top-3 left-3 bg-brown-400/80 text-white px-3 py-1 rounded-full text-xs">
            {category}
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full shadow flex items-center justify-center">
          {veg ? (
            <FaCarrot className="text-green-600" aria-hidden="true" />
          ) : (
            <FaUtensils className="text-red-500" aria-hidden="true" />
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-sm font-semibold text-brown-400 leading-tight flex-1">{title}</h3>
          <span className="text-xs text-caramel-400 font-semibold">★ {rating}</span>
        </div>

        <p className="text-xs text-brown-300 flex items-center gap-2">
          <FaClock className="text-brown-300" aria-hidden="true" /> {time} mins • {difficulty}
        </p>

        <div className="flex flex-wrap gap-2">
          {(tags || []).map((tag, idx) => (
            <span key={`${tag}-${idx}`} className="px-3 py-1 rounded-full bg-cream-200 text-xs text-brown-300">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        {isAuthenticated && _id && (
          <div className="flex gap-2 pt-2 border-t border-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowViewModal(true);
              }}
              className="flex-1 text-xs py-1.5 rounded-lg bg-cream-100 text-brown-400 hover:bg-cream-200 transition flex items-center justify-center gap-1"
            >
              <FaEye /> View
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
              }}
              className="flex-1 text-xs py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center gap-1"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center gap-1 disabled:opacity-50"
            >
              <FaTrash /> {deleting ? '...' : 'Delete'}
            </button>
          </div>
        )}
      </div>
    </article>

    <RecipeViewModal 
      recipe={recipe}
      isOpen={showViewModal}
      onClose={() => setShowViewModal(false)}
      onEdit={() => {
        setShowViewModal(false);
        setShowEditModal(true);
      }}
    />

    <EditRecipeModal 
      recipe={recipe}
      isOpen={showEditModal}
      onClose={() => setShowEditModal(false)}
      onRecipeUpdated={handleUpdate}
    />
    </>
  );
};

export default RecipeCard;
