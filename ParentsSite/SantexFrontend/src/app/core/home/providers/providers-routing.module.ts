import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { ProviderComponent } from './provider/provider.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';

const appRoutes: Routes = [
    { 
        path: '', component: ProvidersListComponent, pathMatch: 'full'
    },
    {
        path: 'add', component: ProviderComponent, pathMatch: 'full'
    },
    {
        path: 'edit/:id', component: ProviderComponent, pathMatch: 'full'
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