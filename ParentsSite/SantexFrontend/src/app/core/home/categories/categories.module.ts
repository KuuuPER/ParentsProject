import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { HomeSharedModule } from '../shared/home-shared.module';
import { PagerComponent } from '../shared/pager/pager.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import * as fromReducer from './store/reducers';
import { categoriesReducer } from './store/reducers/categories.reducers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    HomeSharedModule,
    StoreModule.forFeature('categories', fromReducer.reducer),
  ],
  declarations: [
    CategoriesListComponent,
    CategoryComponent
]
})
export class CategoriesModule { }