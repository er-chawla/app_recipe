import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../store/recipe.action';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducer';

@Injectable()
export class RecipeEffect {

  @Effect()
  getRecipeEffect = this.action$
    .pipe(
      ofType(RecipeActions.FETCH_RECIPE),
      switchMap((action: RecipeActions.FetchRecipe) => {
        return this.httpClient.get<Recipe[]>('https://app-my-recipe.firebaseio.com/recipes.json', {
          observe: 'body',
          responseType: 'json'
        });
      }),
      map((recipe) => {
        console.log(recipe);
        return {
          type: RecipeActions.SET_RECIPE,
          payload: recipe
        };
      })
    );

  @Effect({dispatch: false})
  storeRecieEffect = this.action$
    .pipe(
      ofType(RecipeActions.STORE_RECIPE),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', 'https://app-my-recipe.firebaseio.com/recipes.json', state.recipes, {reportProgress: true});
        return this.httpClient.request(req);
      }));

  constructor(private action$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>) { }
}
