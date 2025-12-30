import { Injectable } from '@angular/core';

export type FavouriteRecipe = {
  id: number;
  title: string;
  image: string;
};

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private readonly storageKey = 'favourites';

  getFavourites(): FavouriteRecipe[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed.filter(
        (x) =>
          x &&
          typeof x.id === 'number' &&
          typeof x.title === 'string' &&
          typeof x.image === 'string'
      );
    } catch {
      return [];
    }
  }

  private save(list: FavouriteRecipe[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  isFavourite(id: number): boolean {
    return this.getFavourites().some((r) => r.id === id);
  }

  addFavourite(fav: FavouriteRecipe) {
    const list = this.getFavourites();
    if (list.some((r) => r.id === fav.id)) return;

    list.unshift(fav);
    this.save(list);
  }

  removeFavourite(id: number) {
    const list = this.getFavourites().filter((r) => r.id !== id);
    this.save(list);
  }
}
