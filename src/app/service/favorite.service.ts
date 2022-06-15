import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favorites: Movie[] = [];
  favoritesSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  genres: Genre[] = [];

  constructor() { }

  getFavoritesSubject(): Observable<Movie[]> {
    return this.favoritesSubject.asObservable();
  }

  addFavorite(movie: Movie): void {
    this.favorites.push(movie);
    this.favoritesSubject.next(this.favorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favorites));
  }

  deleteFavorite(id: number): void {
    this.favorites = this.favorites.filter((movie: Movie) => movie.id !== id);
    this.favoritesSubject.next(this.favorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favorites));
  }

  setGenres(array: Genre[]): void {
    this.genres = array;
  }

  getGenre(id: number): string {
    const GENRE: Genre | undefined = this.genres.find((el: Genre) => el.id === id)
    if(GENRE) {
      return GENRE.name
    } else {
      return "Unknown Genre"
    }
  }

  getArrayLength(): number {
    return this.genres.length
  }

}
