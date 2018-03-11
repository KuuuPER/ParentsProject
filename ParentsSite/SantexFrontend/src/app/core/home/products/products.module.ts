import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { PagerComponent } from '../shared/pager/pager.component';
import { HomeSharedModule } from '../shared/home-shared.module';

import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './pruduct-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import * as fromReducers from './store/reducers';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    HomeSharedModule,
    StoreModule.forFeature('products', fromReducers.reducers)
    // EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [
    ProductComponent,
    ProductListComponent
],
})
export class ProductsModule { }