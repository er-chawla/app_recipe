import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const recipeRoute = [
  {
    path: '', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipesEditComponent, canActivate: [AuthGuardService] },
      { path: ':id', component: RecipesDetailComponent },
      { path: ':id/edit', component: RecipesEditComponent, canActivate: [AuthGuardService] }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipeRoute)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipeRoutingModule { }
