import { redirect } from 'next/navigation';
import { RecipeForm } from '../../../components/RecipeForm';
import { CreateRecipeInput } from '../../../types/recipe';
import { PageHeader } from '../../../components/PageHeader';

export default function NewRecipePage() {
  async function handleSubmit(data: CreateRecipeInput) {
    'use server';

    const res = await fetch(`/api/recipes/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Failed to create recipe');
    }

    const newRecipe = await res.json();
    redirect(`/recipes/${newRecipe.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="New Recipe" />

      <RecipeForm onSubmit={handleSubmit} submitLabel="Create Recipe" />
    </div>
  );
}
