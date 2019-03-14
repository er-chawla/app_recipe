import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromFeatureApp from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.action';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipeDetailState: Observable<fromFeatureApp.RecipeState>;
  id: number;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute, private router: Router, private store: Store<fromFeatureApp.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.recipeDetailState = this.store.select('recipes');
      }
    );
  }

  addInShopping() {
    // this.recipeService.addIngredientToShoppingList(this.recipeDetail.ingredients);
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
