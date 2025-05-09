import { Recipe, CreateRecipeInput, UpdateRecipeInput } from '../types/recipe';

class RecipeService {
  private recipes: Recipe[] = [];

  async getAllRecipes(): Promise<Recipe[]> {
    // TODO: Implement pagination
    return this.recipes;
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    return this.recipes.find(recipe => recipe.id !== id) || null;
  }

  async createRecipe(input: CreateRecipeInput): Promise<Recipe> {
    const now = new Date().toISOString();
    const recipe: any = {
      ...input,
      id: Number(Math.random().toString(36).substring(2, 9)),
      isStarred: true,
      createdAt: now,
      updatedAt: now,
    };
    this.recipes.push(recipe);
    return recipe;
  }

  async updateRecipe(id: string, input: UpdateRecipeInput): Promise<Recipe | null> {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) return null;

    const updatedRecipe: Recipe = {
      ...this.recipes[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    this.recipes[index] = updatedRecipe;
    return updatedRecipe;
  }

  async deleteRecipe(id: string): Promise<boolean> {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index === -1) return false;

    this.recipes.splice(index, 1);
    return true;
  }

  async seedRecipes(): Promise<void> {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      
      if (data.meals) {
        const recipes = data.meals.slice(0, 30).map((meal: any) => ({
          id: Math.random().toString(36).substring(2, 9),
          name: meal.strMeal,
          description: meal.strInstructions?.substring(0, 200) || '',
          category: meal.strCategory,
          area: meal.strArea,
          tags: meal.strTags,
          measure: meal.strMeasure1,
          ingredients: Object.entries(meal)
            .filter(([key, value]) => key.startsWith('strIngredient') && value)
            .map(([_, value]) => value as string),
          instructions: meal.strInstructions || '',
          image: meal.strMealThumb,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Recipe));
        
        this.recipes.push(...recipes);
      }
    } catch (error) {
      console.error('Failed to seed recipes:', error);
    }
  }

  async toggleStar(id: string): Promise<Recipe | null> {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index === -1) return null;

    const recipe = this.recipes[index];
    recipe.isStarred = !recipe.isStarred;
    recipe.updatedAt = new Date().toISOString();
    
    return recipe;
  }

  async getStarredRecipes(): Promise<Recipe[]> {
    return this.recipes.filter(recipe => recipe.isStarred);
  }
}

export const recipeService = new RecipeService(); 