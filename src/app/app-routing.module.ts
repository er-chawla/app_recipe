import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';

const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { path: 'shopping-list', component: ShoppingListComponent }
];


@NgModule(
  {
    imports: [
      RouterModule.forRoot(appRoute)
    ],
    exports: [
      RouterModule
    ]
  }
)
export class AppRoutingModule {

}
