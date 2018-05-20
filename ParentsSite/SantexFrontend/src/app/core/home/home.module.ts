import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeRoutingModule } from './home-routing.module';
import { InfoComponent } from './info/info.component';
import * as fromReducers from './info/store/reducers/';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    StoreModule.forFeature('infos', fromReducers.reducer),
  ],
  declarations: [
    HomeComponent,
    SideBarComponent,
    InfoComponent
  ],  
})
export class HomeModule { }