import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducer';
import * as  fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.put('https://app-my-recipe.firebaseio.com/recipes.json',
      this.recipeService.getRecipe());
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>('https://app-my-recipe.firebaseio.com/recipes.json')
      .subscribe(
        (recipes) => {
          console.log(recipes);
          this.recipeService.setRecipe(recipes);
        }
      );
  }
}
