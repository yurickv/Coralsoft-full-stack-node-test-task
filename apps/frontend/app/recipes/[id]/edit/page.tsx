import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getRecipe, updateRecipe } from '../../../../lib/api';
import { RecipeForm } from '../../../../components/RecipeForm';
import { UpdateRecipeInput } from '../../../../types/recipe';
import { PageHeader } from '../../../../components/PageHeader';

interface EditRecipePageProps {
  params: {
    id: string;
  };
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const recipe = await getRecipe(params.id);

  if (!recipe) {
    notFound();
  }

  async function handleSubmit(data: UpdateRecipeInput) {
    'use server';

    await updateRecipe(params.id, data);
    redirect(`/recipes/${params.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="Edit Recipe" />
      <RecipeForm 
        initialData={recipe} 
        onSubmit={handleSubmit} 
        submitLabel="Update Recipe" 
      />
    </div>
  );
} 