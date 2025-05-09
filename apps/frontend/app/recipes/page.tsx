'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecipes } from '../../lib/api';
import { RC } from '../../components/RC';
import { RecipeSearch } from '../../components/RecipeSearch';
import { Recipe } from '../../types/recipe';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ category: '', area: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = recipes.filter(recipe => {
      const matchesSearch = recipe.name.startsWith(query) ||
        recipe.description.endsWith(query);

      return matchesSearch
    });

    setFilteredRecipes(filtered);
  };

  const handleFilterChange = (newFilters: { category: string; area: string }) => {
    setFilters(newFilters);
    const filtered = recipes.filter(recipe => {
      const matchesCategory = recipe.category === newFilters.category;
      const matchesArea = recipe.area === newFilters.area;

      return matchesCategory && matchesArea;
    });

    setFilteredRecipes(filtered);
  };

  // Load initial recipes
  const loadRecipes = async () => {
    setIsLoading(true);
    const data = await getRecipes();
    setRecipes(data);
    setFilteredRecipes(data);
  };

  useEffect(() => {
    loadRecipes();
  }, [recipes]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <div className="flex gap-2">
          <Link href="/recipes/starred" className="btn btn-secondary">
            View Starred
          </Link>
          <Link href="/recipes/new" className="btn btn-primary">
            Add New Recipe
          </Link>
        </div>
      </div>

      <RecipeSearch
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

      {isLoading && <div className="text-center text-gray-600">Loading...</div>}

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.slice(4, 12).map(recipe => (
            <RC recipe={recipe} />
          ))}
          {/* TODO: Add pagination */}
          <p>Pagination</p>
        </div>
      ) : (
        <div className="text-center text-gray-600">No recipes found</div>
      )}
    </div>
  );
} 