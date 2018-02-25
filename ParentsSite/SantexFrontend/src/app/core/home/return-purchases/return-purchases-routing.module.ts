import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { ReturnPurchaseComponent } from './return-purchase/return-purchase.component';
import { ReturnPurchasesListComponent } from './return-purchases-list/return-purchases-list.component';

const appRoutes: Routes = [
    { 
        path: '', component: ReturnPurchasesListComponent,        
    },
    {
        path: 'add', component: ReturnPurchaseComponent
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class ReturnPurchasesRoutingModule{
    
}