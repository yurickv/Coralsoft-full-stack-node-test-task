export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  category?: string;
  area?: string;
  isStarred?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateRecipeInput = Omit<Recipe, 'createdAt' | 'updatedAt'>;

export type UpdateRecipeInput = Partial<CreateRecipeInput>;

export interface Category {
  title: string;
}

export interface Area {
  title: string;
}
