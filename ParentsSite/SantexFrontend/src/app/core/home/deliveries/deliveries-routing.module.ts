import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveriesListComponent } from './deliveries-list/deliveries-list.component';

const appRoutes: Routes = [
    { 
        path: '', component: DeliveriesListComponent, pathMatch: 'full'
    },
    {
        path: 'add', component: DeliveryComponent, pathMatch: 'full'
    },
    {
        path: 'edit/:id', component: DeliveryComponent, pathMatch: 'full'
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