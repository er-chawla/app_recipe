import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm: NgForm;

  seSubscription: Subscription;
  editItemIndex: number;
  editItemMode = false;
  editItemDetail: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.seSubscription = this.shoppingListService.editIngredientChange
      .subscribe((index) => {
        this.editItemIndex = index;
        this.editItemMode = true;
        this.editItemDetail = this.shoppingListService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editItemDetail.name,
          amount: this.editItemDetail.amount
        });
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (this.editItemMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, new Ingredient(value.name, parseInt(value.amount)));
    } else {
      this.shoppingListService.addIngredent(new Ingredient(value.name, parseInt(value.amount)));
      this.editItemMode = false;
      this.shoppingForm.reset();
    }
  }

  ngOnDestroy() {
    this.seSubscription.unsubscribe();
  }

  onClearItem() {
    this.editItemMode = false;
    this.shoppingForm.reset();
  }

  onDelete() {
    if (this.editItemMode) {
      this.shoppingListService.deleteIngredient(this.editItemIndex);
      this.shoppingForm.reset();
      this.editItemMode = false;
    }
  }

}
