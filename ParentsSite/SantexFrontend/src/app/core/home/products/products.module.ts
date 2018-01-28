import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { productsReducer } from './store/products.reducers';
import { PagerComponent } from '../shared/pager/pager.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './pruduct-list/product-list.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', productsReducer),
    SharedModule
    // EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductsComponent,
    PagerComponent,
    DropdownComponent
],
})
export class ProductsModule { }