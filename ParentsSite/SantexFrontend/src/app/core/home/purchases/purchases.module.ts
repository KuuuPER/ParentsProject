import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { PurchasesListComponent } from './purchases-list/purchases-list.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchasesRoutingModule } from './purchases-routing.module';
import * as fromReducers from './store/reducers';

import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { PurchasesListService } from './services/purchases-list.service';
import { PurchaseService } from './services/purchase.service';
import { EffectsModule } from '@ngrx/effects';
import { PurchasesEffects } from './store/purchases.effects';
import { PurchaseDeliveryComponent } from './purchase-delivery/purchase-delivery.component';
import { ProductsSidePanelComponent } from './products.side-panel/products.side-panel.component';
import { HomeSharedModule } from '../shared/home-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeSharedModule,
    ReactiveFormsModule,
    PurchasesRoutingModule,
    StoreModule.forFeature('purchases', fromReducers.reducers),
    EffectsModule.forFeature([PurchasesEffects]),
    MyDatePickerModule,
  ],
  declarations: [
    PurchasesListComponent,
    PurchaseComponent,
    PurchaseDeliveryComponent,
    ProductsSidePanelComponent
],
providers: [PurchasesListService, PurchaseService],
entryComponents: [ProductsSidePanelComponent, PurchaseDeliveryComponent]
})
export class PurchasesModule { }