import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { StartComponent } from './core/start/start.component';
import { AuthGuard } from './core/auth/auth-guard-service';

const appRoutes: Routes = [
    { path: '', component: StartComponent },
    { path: 'home', loadChildren: './core/home/home.module#HomeModule' },
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}