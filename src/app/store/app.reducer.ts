import { ActionReducerMap } from '@ngrx/store';

import * as  fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
  shoppingList: fromShoppingList.ShoppingState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.ShoppingListReducer,
  auth: fromAuth.authReducer
};

