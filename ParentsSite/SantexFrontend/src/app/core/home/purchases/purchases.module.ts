import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { PurchasesListComponent } from './purchases-list/purchases-list.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { HomeSharedModule } from '../shared/home-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchasesRoutingModule } from './purchases-routing.module';
import * as fromReducers from './store/reducers';

import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeSharedModule,
    PurchasesRoutingModule,
    StoreModule.forFeature('purchases', fromReducers.reducers),
    MyDatePickerModule
  ],
  declarations: [
    PurchasesListComponent,
    PurchaseComponent
]
})
export class PurchasesModule { }