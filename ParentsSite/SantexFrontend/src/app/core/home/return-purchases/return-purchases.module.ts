import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { ReturnPurchasesListComponent } from './return-purchases-list/return-purchases-list.component';
import { ReturnPurchaseComponent } from './return-purchase/return-purchase.component';
import { HomeSharedModule } from '../shared/home-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReturnPurchasesRoutingModule } from './return-purchases-routing.module';
import { returnPurchasesReducer } from './store/return-purchases.reducers';

import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeSharedModule,
    ReturnPurchasesRoutingModule,
    StoreModule.forFeature('returnPurchases', returnPurchasesReducer),
    MyDatePickerModule
  ],
  declarations: [
    ReturnPurchasesListComponent,
    ReturnPurchaseComponent
]
})
export class PurchasesModule { }