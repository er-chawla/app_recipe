import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';

import { RecipeService } from '../../recipes/recipe.service';
import { Recipe } from '../../recipes/recipe.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  recipeDetail: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute, private dataStorageService: DataStorageService,
    private authService: AuthService) {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.recipeDetail = this.recipeService.getRecipeDetail(this.id);
      }
    );
  }

  onSaveRecipeData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onGetRecipeData() {
    this.dataStorageService.getRecipes();
  }

  onSignOut() {
    this.authService.logOut();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
