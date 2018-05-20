import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PagerComponent } from '../shared/pager/pager.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { DriverComponent } from './driver/driver.component';
import { DriversRoutingModule } from './drivers-routing.module';
import * as fromReducers from './store/reducers';
import { DriversEffects } from './store/drivers.effects';
import { DriversListService } from './services/drivers-list.service';
import { DriverService } from './services/driver.service';
import { HomeSharedModule } from '../shared/home-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeSharedModule,
    ReactiveFormsModule,
    DriversRoutingModule,
    StoreModule.forFeature('drivers', fromReducers.reducer),
    EffectsModule.forFeature([DriversEffects])
  ],
  declarations: [
    DriversListComponent,
    DriverComponent
],
providers: [DriversListService, DriverService]
})
export class DriversModule { }