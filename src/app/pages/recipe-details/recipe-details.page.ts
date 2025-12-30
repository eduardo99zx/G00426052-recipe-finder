import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
  IonItem,
  IonList,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';

import { RecipeService, SpoonacularRecipeDetails } from '../../services/recipe.service';
import { FavouritesService } from '../../services/favourites.service';
import { SettingsService, Measurement } from '../../services/settings.service';

type IngredientView = {
  name: string;
  amount: number;
  unit: string;
};

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonText,
    IonItem,
    IonList,
    IonBackButton,
    IonButtons,
  ],
})
export class RecipeDetailsPage {
  recipeId = 0;
  recipe?: SpoonacularRecipeDetails;

  measurement: Measurement = 'metric';
  isFavourite = false;

  constructor(
    private route: ActivatedRoute,
    private recipes: RecipeService,
    private favourites: FavouritesService,
    private settings: SettingsService
  ) {}

  ionViewWillEnter() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.recipeId = idParam ? Number(idParam) : 0;

    // Always re-read settings when entering the page
    this.measurement = this.settings.getMeasurement();

    if (!this.recipeId) return;
    this.loadRecipe();
  }

  private loadRecipe() {
    this.recipes.getRecipeDetails(this.recipeId).subscribe((data) => {
      this.recipe = data;
      this.isFavourite = this.favourites.isFavourite(data.id);
    });
  }

  toggleFavourite() {
    if (!this.recipe) return;

    const fav = {
      id: this.recipe.id,
      title: this.recipe.title,
      image: this.recipe.image,
    };

    if (this.isFavourite) {
      this.favourites.removeFavourite(this.recipe.id);
      this.isFavourite = false;
    } else {
      this.favourites.addFavourite(fav);
      this.isFavourite = true;
    }
  }

  /**
   * IMPORTANT (PDF): show Metric/US amounts depending on Settings.
   * We intentionally build a clean list so the user clearly sees unit changes.
   */
  getIngredientsList(): IngredientView[] {
    if (!this.recipe) return [];

    return this.recipe.extendedIngredients.map((ing) => {
      const m = this.measurement === 'us' ? ing.measures.us : ing.measures.metric;

      return {
        // Using "original" as the best available human-readable ingredient name.
        // Amount/unit shown are the ones that must change with Settings.
        name: ing.original,
        amount: m.amount,
        unit: m.unitLong,
      };
    });
  }

  getSteps(): Array<{ number: number; step: string }> {
    if (!this.recipe) return [];
    const all = this.recipe.analyzedInstructions ?? [];
    const first = all.length ? all[0] : undefined;
    return first?.steps ?? [];
  }
}
