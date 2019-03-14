import { Ingredient } from '../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.action';

export interface ShoppingState {
  ingredients: Ingredient[];
  editShoppingItem: Ingredient;
  editShoppingItemIndex: number;
}

const initialState: ShoppingState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editShoppingItem: null,
  editShoppingItemIndex: -1
};
export function ShoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    }
    case ShoppingListActions.ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    }
    case ShoppingListActions.UPDATE_INGREDIENT: {
      const ingredient = state.ingredients[state.editShoppingItemIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editShoppingItemIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editIngredient: null,
        editShoppingItemIndex: -1
      };
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      const oldIngredient = [...state.ingredients];
      oldIngredient.splice(state.editShoppingItemIndex, 1);
      const data = {
        ...state,
        ingredients: oldIngredient,
        editIngredient: null,
        editShoppingItemIndex: -1
      };
      return data;
    }
    case ShoppingListActions.START_EDIT: {
      const editIngredient = state.ingredients[action.payload];
      return {
        ...state,
        editShoppingItem: editIngredient,
        editShoppingItemIndex: action.payload
      };
    }
    case ShoppingListActions.STOP_EDIT: {
      return {
        ...state,
        editIngredient: null,
        editShoppingItemIndex: -1
      };
    }
    default:
      return state;
  }
}
