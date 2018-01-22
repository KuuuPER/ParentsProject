import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { productsReducer } from './store/products.reducers';
import { PagerComponent } from '../shared/pager/pager.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', productsReducer),
    // EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [
    ProductsComponent,
    PagerComponent,
],
})
export class ProductsModule { }