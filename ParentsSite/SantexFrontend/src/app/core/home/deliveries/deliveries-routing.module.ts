import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveriesListComponent } from './deliveries-list/deliveries-list.component';

const appRoutes: Routes = [
    { 
        path: '', component: DeliveriesListComponent,        
    },
    {
        path: 'add', component: DeliveryComponent
    },
    {
        path: 'edit', component: DeliveryComponent
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class DeliveriesRoutingModule{
    
}