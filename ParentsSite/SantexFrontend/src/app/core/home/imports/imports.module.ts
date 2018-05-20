import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { PagerComponent } from '../shared/pager/pager.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { ImportsListComponent } from './imports-list/imports-list.component';
import { ImportComponent } from './import/import.component';
import { ImportsRoutingModule } from './imports-routing.module';
import * as fromReducers from './store/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { EffectsModule } from '@ngrx/effects';
import { ImportsEffects } from './store/imports.effects';
import { HomeSharedModule } from '../shared/home-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeSharedModule,
    ReactiveFormsModule,
    ImportsRoutingModule,
    StoreModule.forFeature('imports', fromReducers.reducers),
    EffectsModule.forFeature([ImportsEffects]),
    MyDatePickerModule
  ],
  declarations: [
    ImportsListComponent,
    ImportComponent
]
})
export class ImportsModule { }