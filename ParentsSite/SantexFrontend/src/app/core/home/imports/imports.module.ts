import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { HomeSharedModule } from '../shared/home-shared.module';
import { PagerComponent } from '../shared/pager/pager.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { ImportsListComponent } from './imports-list/imports-list.component';
import { ImportComponent } from './import/import.component';
import { ImportsRoutingModule } from './imports-routing.module';
import * as fromReducers from './store/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImportsRoutingModule,
    HomeSharedModule,
    StoreModule.forFeature('imports', fromReducers.reducers),
    MyDatePickerModule
  ],
  declarations: [
    ImportsListComponent,
    ImportComponent
]
})
export class ImportsModule { }