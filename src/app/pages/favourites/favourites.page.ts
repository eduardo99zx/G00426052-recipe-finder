import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButtons,
  IonBackButton,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';

import {
  FavouritesService,
  FavouriteRecipe,
} from '../../services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonButtons,
    IonBackButton,
    IonButton,
    IonText,
  ],
})
export class FavouritesPage {
  favourites: FavouriteRecipe[] = [];

  constructor(private favService: FavouritesService) {}

  ionViewWillEnter() {
    this.favourites = this.favService.getFavourites();
  }

  remove(id: number) {
    this.favService.removeFavourite(id);
    this.favourites = this.favService.getFavourites();
  }
}
