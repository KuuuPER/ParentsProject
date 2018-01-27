import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './pruduct-list/product-list.component';

const appRoutes: Routes = [
    { 
        path: '', component: ProductListComponent,        
    },
    {
        path: 'add', component: ProductComponent
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class ProductsRoutingModule{
    
}