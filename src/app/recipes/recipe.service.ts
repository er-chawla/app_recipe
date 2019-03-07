import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Sping Roll',
      'these delicious veg spring rolls are crunchy from outside, with a spiced veggie filling from inside',
      'https://www.vegrecipesofindia.com/wp-content/uploads/2018/10/veg-spring-rolls-recipe-1-500x500.jpg',
      [
        new Ingredient('Noodles', 10),
        new Ingredient('Onion', 15)
      ]),
    new Recipe(
      'Veg Kofta',
      'Veg Kofta Curry is an exotic Indian gravy dish made from mix vegetable dumplings..',
      'https://i0.wp.com/mypullzone-9vexd6dl53at.netdna-ssl.com/wp-content/uploads/2018/03/Veg-Kofta-Recipe-Step-By-Step-Instructions.jpg',
      [
        new Ingredient('Cabbage', 20),
        new Ingredient('Flour', 10)
      ])

  ];

  constructor(private slService: ShoppingListService) { }

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipeDetail(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredents(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipe(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
