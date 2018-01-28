import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { HomeSharedModule } from '../shared/home-shared.module';
import { PagerComponent } from '../shared/pager/pager.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { ManufacturesComponent } from './manufactures.component';
import { ManufactureListComponent } from './manufacture-list/manufacture-list.component';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { ManufacturesRoutingModule } from './manufactures-routing.module';
import { manufacturesReducer } from './store/manufacture.reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManufacturesRoutingModule,
    HomeSharedModule,
    StoreModule.forFeature('manufactures', manufacturesReducer),
  ],
  declarations: [ManufacturesComponent,
    ManufactureListComponent,
    ManufactureComponent
]
})
export class ManufacturesModule { }