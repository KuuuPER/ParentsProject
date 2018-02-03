import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { ProviderComponent } from './provider/provider.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';

const appRoutes: Routes = [
    { 
        path: '', component: ProvidersListComponent,        
    },
    {
        path: 'add', component: ProviderComponent
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class ProvidersRoutingModule{
    
}