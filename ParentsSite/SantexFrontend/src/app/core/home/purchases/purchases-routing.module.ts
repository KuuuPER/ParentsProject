import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { PurchaseComponent } from './purchase/purchase.component';
import { PurchasesListComponent } from './purchases-list/purchases-list.component';

const appRoutes: Routes = [
    { 
        path: '', component: PurchasesListComponent,        
    },
    {
        path: 'add', component: PurchaseComponent
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class PurchasesRoutingModule{
    
}