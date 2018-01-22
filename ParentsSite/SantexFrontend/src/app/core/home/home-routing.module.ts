import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, children:
        [
            { path: '', loadChildren: './products/products.module#ProductsModule' },
            { path: 'products', loadChildren: './products/products.module#ProductsModule' }
        ] },
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule{
    
}