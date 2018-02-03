import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, children:
        [
            { path: '', loadChildren: './products/products.module#ProductsModule' },
            { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule'},
            { path: 'manufactures',  loadChildren: './manufactures/manufactures.module#ManufacturesModule'},
            { path: 'products', loadChildren: './products/products.module#ProductsModule' },
            { path: 'providers',  loadChildren: './providers/providers.module#ProvidersModule'}
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