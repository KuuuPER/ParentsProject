import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { PagerComponent } from '../shared/pager/pager.component';
import { HomeSharedModule } from '../shared/home-shared.module';

import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './pruduct-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { productsReducer } from './store/products.reducers';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    HomeSharedModule,
    StoreModule.forFeature('products', productsReducer)
    // EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductsComponent
],
})
export class ProductsModule { }