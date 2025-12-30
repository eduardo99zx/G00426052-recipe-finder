import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type SpoonacularSearchResult = {
  id: number;
  title: string;
  image: string;
};

export type SpoonacularSearchResponse = {
  results: SpoonacularSearchResult[];
  offset: number;
  number: number;
  totalResults: number;
};

export type SpoonacularIngredientMeasure = {
  amount: number;
  unitLong: string;
};

export type SpoonacularIngredient = {
  original: string;
  measures: {
    metric: SpoonacularIngredientMeasure;
    us: SpoonacularIngredientMeasure;
  };
};

export type SpoonacularStep = {
  number: number;
  step: string;
};

export type SpoonacularInstruction = {
  name?: string;
  steps: SpoonacularStep[];
};

export type SpoonacularRecipeDetails = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary?: string;
  extendedIngredients: SpoonacularIngredient[];
  analyzedInstructions?: SpoonacularInstruction[];
};

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly apiKey = '70759a4f7911402abcc53d3c51d3b759';

  private readonly searchBaseUrl =
    'https://api.spoonacular.com/recipes/complexSearch';

  private readonly detailsBaseUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) {}

  searchRecipesByIngredients(query: string): Observable<SpoonacularSearchResponse> {
    const url =
      `${this.searchBaseUrl}` +
      `?query=${encodeURIComponent(query)}` +
      `&number=10` +
      `&apiKey=${this.apiKey}`;

    return this.http.get<SpoonacularSearchResponse>(url);
  }

  getRecipeDetails(id: number): Observable<SpoonacularRecipeDetails> {
    const url =
      `${this.detailsBaseUrl}/${id}/information` +
      `?includeNutrition=false` +
      `&apiKey=${this.apiKey}`;

    return this.http.get<SpoonacularRecipeDetails>(url);
  }
}
