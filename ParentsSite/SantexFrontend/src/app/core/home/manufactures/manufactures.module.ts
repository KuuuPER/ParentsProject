import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { PagerComponent } from '../shared/pager/pager.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { ManufactureListComponent } from './manufacture-list/manufacture-list.component';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { ManufacturesRoutingModule } from './manufactures-routing.module';
import * as fromReducers from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ManufacturesEffects } from './store/manufactures.effects';
import { HomeSharedModule } from '../shared/home-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeSharedModule,
    ReactiveFormsModule,
    ManufacturesRoutingModule,
    StoreModule.forFeature('manufactures', fromReducers.reducer),
    EffectsModule.forFeature([ManufacturesEffects])
  ],

  declarations: [
    ManufactureListComponent,
    ManufactureComponent
]
})
export class ManufacturesModule { }