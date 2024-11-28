export interface Recipe {
    strMeal: string;
    strMealThumb?: string;
    strInstructions: string;
    strYoutube?: string;
    strIngredients: string;
    strCategory?: string;
    strArea?: string;
    [key: string]: any; // For dynamic strIngredient and strMeasure properties
}