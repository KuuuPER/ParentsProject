import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { ImportComponent } from './import/import.component';
import { ImportsListComponent } from './imports-list/imports-list.component';

const appRoutes: Routes = [
    { 
        path: '', component: ImportsListComponent,        
    },
    {
        path: 'add', component: ImportComponent
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class ImportsRoutingModule{
    
}