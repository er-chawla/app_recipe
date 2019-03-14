import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredients.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.action';
import * as fromAppState from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm: NgForm;

  seSubscription: Subscription;
  editItemMode = false;
  editItemDetail: Ingredient;

  constructor(private store: Store<fromAppState.AppState>) { }

  ngOnInit() {
    this.seSubscription = this.store.select('shoppingList')
      .subscribe(
        (data) => {
          if (data.editShoppingItemIndex > -1) {
            this.editItemMode = true;
            this.editItemDetail = data.editShoppingItem;
            this.shoppingForm.setValue({
              name: this.editItemDetail.name,
              amount: this.editItemDetail.amount
            });
          } else {
            this.editItemMode = false;
          }
        });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editItemMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ ingredient }));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
      this.editItemMode = false;
      this.shoppingForm.reset();
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.seSubscription.unsubscribe();
  }

  onClearItem() {
    this.editItemMode = false;
    this.shoppingForm.reset();
  }

  onDelete() {
    if (this.editItemMode) {
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
      this.shoppingForm.reset();
      this.editItemMode = false;
    }
  }

}
