import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.put('https://app-my-recipe.firebaseio.com/recipes.json',
      this.recipeService.getRecipe(), {
        headers: new HttpHeaders().set('auth', token)
      });
  }

  getRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.get<Recipe[]>('https://app-my-recipe.firebaseio.com/recipes.json', {
      headers: new HttpHeaders().set('auth', token)
    })
      .subscribe(
        (recipes) => {
          console.log(recipes);
          this.recipeService.setRecipe(recipes);
        }
      );
  }
}
