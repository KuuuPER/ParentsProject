import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { DeliveriesListComponent } from './deliveries-list/deliveries-list.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { HomeSharedModule } from '../shared/home-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveriesRoutingModule } from './deliveries-routing.module';
import { deliveriesReducer } from './store/deliveries.reducers';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeSharedModule,
    DeliveriesRoutingModule,
    StoreModule.forFeature('deliveries', deliveriesReducer),
    MyDatePickerModule
  ],
  declarations: [
    DeliveriesListComponent,
    DeliveryComponent
]
})
export class DeliveriesModule { }