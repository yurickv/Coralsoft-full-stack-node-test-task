'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/PageHeader';

interface Recipe {
  id: string;
  name: string;
  image?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  description?: string;
  ingredients: string[];
  instructions: string;
}

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default function RecipeDetailsPage({ params }: RecipePageProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`/api/recipes/${params.id}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setRecipe(data);
      }
    };

    fetchRecipe();
  }, [params.id, router]);

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this recipe?');
    if (!confirmed) return;

    const res = await fetch(`/api/recipes/${params.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/recipes');
    } else {
      alert('Failed to delete recipe');
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <PageHeader
        title={recipe.name}
        extraButtons={
          <div className="flex gap-2">
            <Link href={`/recipes/${recipe.id}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-secondary">
              Delete
            </button>
          </div>
        }
      />

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {recipe.prepTime && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Prep Time</h3>
            <p>{recipe.prepTime} minutes</p>
          </div>
        )}
        {recipe.cookTime && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Cook Time</h3>
            <p>{recipe.cookTime} minutes</p>
          </div>
        )}
        {recipe.servings && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Servings</h3>
            <p>{recipe.servings}</p>
          </div>
        )}
      </div>

      {recipe.description && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-600">{recipe.description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-600">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <p className="whitespace-pre-line text-gray-600">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}
