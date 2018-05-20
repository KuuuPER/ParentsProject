import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AuthComponent
],
  exports: [
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {}
