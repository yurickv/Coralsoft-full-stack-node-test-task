'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RecipesFilters } from '../../components/RecipesFilters';
import { Recipe } from '../../types/recipe';
import { RecipeCard } from '../../components/RecipeCard';
import { Pagination } from '../../components/Pagintion';

export default function RecipesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 9;

  const fetchRecipes = async () => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(searchQuery && { q: searchQuery }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedArea && { area: selectedArea }),
      });

      const res = await fetch(`api/recipes?${params.toString()}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch recipes: ${res.status}`);
      }

      const data = await res.json();
      setRecipes(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    // Fetch categories and areas metadata
    const fetchMetadata = async () => {
      const [categoriesRes, areasRes] = await Promise.all([
        fetch(`api/categories`, { cache: 'no-store' }),
        fetch(`api/areas`, { cache: 'no-store' }),
      ]);

      if (!categoriesRes.ok || !areasRes.ok) throw new Error('Failed to fetch metadata');

      const [categoriesData, areasData] = await Promise.all([
        categoriesRes.json(),
        areasRes.json(),
      ]);

      setCategories(categoriesData.map((c: { strCategory: string }) => c.strCategory));
      setAreas(areasData.map((a: { strArea: string }) => a.strArea));
    };

    fetchMetadata();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [page, searchQuery, selectedCategory, selectedArea, fetchRecipes]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedArea('');
    setPage(1);
  };

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
      {/* Render the filters */}
      <RecipesFilters
        categories={categories}
        areas={areas}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        handleReset={handleReset}
        setPage={setPage}
      />

      {/* Recipe List */}
      {recipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      ) : (
        <div className="text-center text-gray-600 mt-6">No recipes found</div>
      )}
    </div>
  );
}
