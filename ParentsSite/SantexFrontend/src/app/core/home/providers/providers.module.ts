import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PagerComponent } from '../shared/pager/pager.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { ProviderComponent } from './provider/provider.component';
import { ProvidersRoutingModule } from './providers-routing.module';
import * as fromReducers from './store/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProvidersEffects } from './store/providers.effects';
import { HomeSharedModule } from '../shared/home-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeSharedModule,
    ReactiveFormsModule,
    ProvidersRoutingModule,
    StoreModule.forFeature('providers', fromReducers.reducer),
    EffectsModule.forFeature([ProvidersEffects]),
  ],
  declarations: [
    ProvidersListComponent,
    ProviderComponent
]
})
export class ProvidersModule { }