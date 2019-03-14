import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { RecipeService } from '../../recipes/recipe.service';
import { Recipe } from '../../recipes/recipe.model';
import { DataStorageService } from '../../shared/data-storage.service';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthAction from '../../auth/store/auth.action';
import * as RecipeAction from '../../recipes/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;
  authState: Observable<fromAuth.AuthState>;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute, private dataStorageService: DataStorageService,
              private store: Store<fromApp.AppState>) {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.recipeDetail = this.recipeService.getRecipeDetail(this.id);
      }
    );
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveRecipeData() {
    this.store.dispatch(new RecipeAction.StoreRecipe());
  }

  onGetRecipeData() {
    this.store.dispatch(new RecipeAction.FetchRecipe());
  }

  onSignOut() {
    this.store.dispatch(new AuthAction.Logout());
  }
}
