import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { FooterComponent } from '../shared/footer/footer.component';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreComponent } from './core.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard-service';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule
  ],
  declarations: [
    CoreComponent,
    StartComponent
],
  exports:[
    AppRoutingModule,
    CoreComponent
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true  
    }
  ],
})
export class CoreModule { }