import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { PagerComponent } from '../shared/pager/pager.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import * as fromReducer from './store/reducers';
import { categoriesReducer } from './store/reducers/categories.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './store/categories.effects';
import { HomeSharedModule } from '../shared/home-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeSharedModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    StoreModule.forFeature('categories', fromReducer.reducer),
    EffectsModule.forFeature([CategoriesEffects])
  ],
  declarations: [
    CategoriesListComponent,
    CategoryComponent
]
})
export class CategoriesModule { }