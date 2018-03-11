import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { HomeSharedModule } from '../shared/home-shared.module';
import { PagerComponent } from '../shared/pager/pager.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { DriverComponent } from './driver/driver.component';
import { DriversRoutingModule } from './drivers-routing.module';
import * as fromReducers from './store/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DriversRoutingModule,
    HomeSharedModule,
    StoreModule.forFeature('drivers', fromReducers.reducer),
  ],
  declarations: [
    DriversListComponent,
    DriverComponent
]
})
export class DriversModule { }