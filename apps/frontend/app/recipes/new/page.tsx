'use client';

import { useRouter } from 'next/navigation';
import { RecipeForm } from '../../../components/RecipeForm';
import { CreateRecipeInput } from '../../../types/recipe';
import { PageHeader } from '../../../components/PageHeader';

export default function NewRecipePage() {
  const router = useRouter();

  async function handleSubmit(data: CreateRecipeInput) {
    const res = await fetch('/api/recipes/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || 'Failed to create recipe');
    }

    const newRecipe = await res.json();
    router.push(`/recipes/${newRecipe.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="New Recipe" />
      <RecipeForm onSubmit={handleSubmit} submitLabel="Create Recipe" />
    </div>
  );
}
