import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { HomeSharedModule } from '../shared/home-shared.module';
import { PagerComponent } from '../shared/pager/pager.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { ProviderComponent } from './provider/provider.component';
import { ProvidersRoutingModule } from './providers-routing.module';
import { providersReducer } from './store/providers.reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProvidersRoutingModule,
    HomeSharedModule,
    StoreModule.forFeature('providers', providersReducer),
  ],
  declarations: [
    ProvidersListComponent,
    ProviderComponent
]
})
export class ProvidersModule { }