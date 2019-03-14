import { ActionReducerMap } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredients.model';
import * as RecipeActions from './recipe.action';

export interface FeatureState {
  recipes: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [
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

  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeAction) {
  switch (action.type) {
    case (RecipeActions.ADD_RECIPE): {
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    }
    case (RecipeActions.UPDATE_RECIPE): {
      const recipe = state.recipes[action.payload.index];
      const UpdateRecipe = { ...recipe, ...action.payload.recipe };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = UpdateRecipe;
      return {
        ...state,
        recipes
      };
    }
    case (RecipeActions.DELETE_RECIPE): {
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    }
    case (RecipeActions.SET_RECIPE): {
      return {
        ...state,
        recipes: action.payload
      };
    }

  }
  return state;
}
