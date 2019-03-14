import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const SET_RECIPE = 'SET_RECIPE';
export const FETCH_RECIPE = 'FETCH_RECIPE';
export const STORE_RECIPE = 'STORE_RECIPE';

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number, recipe: Recipe }) { }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) { }
}

export class SetRecipe implements Action {
  readonly type = SET_RECIPE;

  constructor(public payload: Recipe[]) { }
}

export class FetchRecipe implements Action {
  readonly type = FETCH_RECIPE;
}

export class StoreRecipe implements Action {
  readonly type = STORE_RECIPE;
}

export type RecipeAction = AddRecipe | UpdateRecipe | DeleteRecipe | SetRecipe;
