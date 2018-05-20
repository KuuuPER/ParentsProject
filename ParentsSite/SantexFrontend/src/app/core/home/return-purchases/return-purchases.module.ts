import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { ReturnPurchasesListComponent } from './return-purchases-list/return-purchases-list.component';
import { ReturnPurchaseComponent } from './return-purchase/return-purchase.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReturnPurchasesRoutingModule } from './return-purchases-routing.module';
import * as fromReducers from './store/reducers';
import { purchasesReducer } from '../purchases/store/reducers/purchases.reducers';

import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReturnPurchasesRoutingModule,
    StoreModule.forFeature('returnPurchases', fromReducers.reducers),
    MyDatePickerModule
  ],
  declarations: [
    ReturnPurchasesListComponent,
    ReturnPurchaseComponent
]
})
export class ReturnPurchasesModule { }