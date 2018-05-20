import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { DeliveriesListComponent } from './deliveries-list/deliveries-list.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveriesRoutingModule } from './deliveries-routing.module';
import * as fromReducers from './store/reducers';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { DeliveriesEffects } from './store/deliveries.effects';
import { EffectsModule } from '@ngrx/effects';
import { DeliveriesListService } from './services/deliveries-list.service';
import { DeliveryService } from './services/delivery.service';
import { DriversEffects } from '../drivers/store/drivers.effects';
import { DriverService } from '../drivers/services/driver.service';
import { DriversListService } from '../drivers/services/drivers-list.service';
import { PurchaseComponent } from './purchase/purchase.component';
import { HomeSharedModule } from '../shared/home-shared.module';
import { SidePanelContainerComponent } from '../shared/side-panel-container/side-panel-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeSharedModule,
    ReactiveFormsModule,    
    DeliveriesRoutingModule,    
    StoreModule.forFeature('deliveries', fromReducers.reducers),
    EffectsModule.forFeature([DeliveriesEffects, DriversEffects]),
    MyDatePickerModule
  ],
  declarations: [
    DeliveriesListComponent,
    DeliveryComponent,
    PurchaseComponent
],
providers: [DeliveriesListService, DeliveryService, DriversListService, DriverService],
entryComponents: [PurchaseComponent]
})
export class DeliveriesModule { }