import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';

const appRoutes: Routes = [
    { path: '', component: ProductsComponent, children: [
        {path: 'add', loadChildren: './product/product.module#ProductModule' }
    ] },
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class ProductsRoutingModule{
    
}