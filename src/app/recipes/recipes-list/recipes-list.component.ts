import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Observable<{ recipes: Recipe[] }>;
  constructor(private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.recipeService.recipeChanged
    //   .subscribe(
    //     (recipes: Recipe[]) => {
    //       this.recipes = recipes;
    //     }
    //   );
    this.recipes = this.store.select('recipes');
  }

  addNewRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }
}
