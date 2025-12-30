import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonIcon,
  IonList,
  IonThumbnail,
} from '@ionic/angular/standalone';

import { RecipeService, SpoonacularSearchResult } from '../services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonIcon,
    IonList,
    IonThumbnail,
  ],
})
export class HomePage {
  ingredients = '';
  recipes: SpoonacularSearchResult[] = [];

  constructor(private recipesApi: RecipeService) {}

  onSearch() {
    const query = this.ingredients.trim();
    if (!query) {
      this.recipes = [];
      return;
    }

    this.recipesApi.searchRecipesByIngredients(query).subscribe((data) => {
      this.recipes = data.results ?? [];
    });
  }
}
