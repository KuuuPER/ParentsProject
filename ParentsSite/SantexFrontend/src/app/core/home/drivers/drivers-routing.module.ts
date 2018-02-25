import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { DriverComponent } from './driver/driver.component';
import { DriversListComponent } from './drivers-list/drivers-list.component';

const appRoutes: Routes = [
    { 
        path: '', component: DriversListComponent,        
    },
    {
        path: 'add', component: DriverComponent
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class DriversRoutingModule{
    
}