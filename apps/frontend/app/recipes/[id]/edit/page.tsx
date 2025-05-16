'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RecipeForm } from '../../../../components/RecipeForm';
import { UpdateRecipeInput, Recipe } from '../../../../types/recipe';
import { PageHeader } from '../../../../components/PageHeader';
import { Loader } from '../../../../components/loader';

interface EditRecipePageProps {
  params: {
    id: string;
  };
}

export default function EditRecipePage({ params }: EditRecipePageProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`/api/recipes/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setRecipe(data);
      } else {
        router.replace('/not-found'); // optional: redirect if not found
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [params.id, router]);

  const handleSubmit = async (data: UpdateRecipeInput) => {
    const res = await fetch(`/api/recipes/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push(`/recipes/${params.id}`);
    } else {
      console.error('Failed to update recipe');
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader size="lg" variant="primary" className="mb-4" />
        <p className="text-muted-foreground">Loading recipe details...</p>
      </div>
    );
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="Edit Recipe" />
      <RecipeForm initialData={recipe} onSubmit={handleSubmit} submitLabel="Update Recipe" />
    </div>
  );
}
