import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { ManufactureComponent } from './manufacture/manufacture.component';
import { ManufactureListComponent } from './manufacture-list/manufacture-list.component';

const appRoutes: Routes = [
    { 
        path: '', component: ManufactureListComponent,        
    },
    {
        path: 'add', component: ManufactureComponent
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class ManufacturesRoutingModule{
    
}