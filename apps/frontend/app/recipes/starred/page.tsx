'use client';

import { useState, useEffect } from 'react';
import { RecipeCard } from '../../../components/RecipeCard';
import { Recipe } from '../../../types/recipe';
import { PageHeader } from '../../../components/PageHeader';
import { Loader } from '../../../components/loader';

export default function StarredRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await getStarredRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Failed to load starred recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="Starred Recipes" />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader size="lg" variant="primary" className="mb-4" />
          <p className="text-muted-foreground">Loading recipes...</p>
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No starred recipes yet</div>
      )}
    </div>
  );
}

async function getStarredRecipes() {
  const res = await fetch('/api/recipes/starred', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch starred recipes');
  }
  return res.json();
}
