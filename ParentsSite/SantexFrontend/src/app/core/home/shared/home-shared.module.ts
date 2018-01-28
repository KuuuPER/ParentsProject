import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagerComponent } from './pager/pager.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule } from "@angular/forms";

@NgModule({
    imports:[
        CommonModule,
        FormsModule
    ],
    declarations: [
        PagerComponent,
        DropdownComponent
    ],
    exports: [
        PagerComponent,
        DropdownComponent
    ]
})
export class HomeSharedModule{
}