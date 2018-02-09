import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import 'rxjs/add/operator/map';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

   favorites: Array<any>;

  constructor(public http: Http,
    private storage: Storage,
    private localNotifications: LocalNotifications,
    private dishservice: DishProvider) {
    console.log('Hello FavoriteProvider Provider');
    storage.get('favorites').then(favorites => {
      if (favorites) {
        console.log("There is favorites in favoriteProvier");
        console.log(favorites);
        this.favorites = favorites;
      }
      else {
        this.favorites = [];
        console.log('favorite not defined');
      }
    });
  }

  addFavorite(id: number): boolean {

  if (!this.isFavorite(id)) {
   this.favorites.push(id);
   this.storage.set('favorites', this.favorites);
   // Schedule a single notification
    this.localNotifications.schedule({
      id: id,
      text: 'Dish ' + id + ' added as a favorite successfully'
    });
    }
   return true;

 }

 isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    this.favorites = this.favorites.filter(favorite => favorite !== id)
    this.storage.remove('favorites');
    this.storage.set('favorites', this.favorites);
    return this.getFavorites();
    }

}
