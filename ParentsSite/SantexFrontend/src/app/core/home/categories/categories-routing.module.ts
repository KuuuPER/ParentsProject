import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';

const appRoutes: Routes = [
    { 
        path: '', component: CategoriesListComponent,        
    },
    {
        path: 'add', component: CategoryComponent
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class CategoriesRoutingModule{
    
}