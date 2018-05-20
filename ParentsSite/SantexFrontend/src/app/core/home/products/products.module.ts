import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { PagerComponent } from '../shared/pager/pager.component';

import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './pruduct-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import * as fromReducers from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products.effects';
import { CategoriesEffects } from '../categories/store/categories.effects';
import { ManufacturesEffects } from '../manufactures/store/manufactures.effects';
import { ProvidersEffects } from '../providers/store/providers.effects';
import { HomeSharedModule } from '../shared/home-shared.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    HomeSharedModule,
    StoreModule.forFeature('products', fromReducers.reducers),
    EffectsModule.forFeature([ProductsEffects, CategoriesEffects, ManufacturesEffects, ProvidersEffects])
  ],
  declarations: [
    ProductComponent,
    ProductListComponent
],
})
export class ProductsModule { }