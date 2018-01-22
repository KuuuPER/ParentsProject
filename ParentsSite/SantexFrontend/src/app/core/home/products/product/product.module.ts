import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { productsReducer } from '../store/products.reducers';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProductRoutingModule,
    StoreModule.forFeature('products', productsReducer),
    // EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [
    ProductComponent,
],
})
export class ProductModule { }