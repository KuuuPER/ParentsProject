import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';

const appRoutes: Routes = [
    { path: '', component: ProductComponent },
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class ProductRoutingModule{
    
}