import { redirect } from 'next/navigation';
import { createRecipe } from '../../../lib/api';
import { RecipeForm } from '../../../components/RecipeForm';
import { CreateRecipeInput } from '../../../types/recipe';
import { PageHeader } from '../../../components/PageHeader';
export default function NewRecipePage() {
  async function handleSubmit(data: CreateRecipeInput) {
    'use server';
    if (!data.instructions) {
      throw new Error('Required fields are missing');
    }
    const recipe = await createRecipe(data as CreateRecipeInput);
    redirect(`/recipes/${recipe.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="New Recipe" />
      <RecipeForm onSubmit={handleSubmit} submitLabel="Create Recipe" />
    </div>
  );
} 