import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagerComponent } from './pager/pager.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownFormComponent } from './dropdown-form/dropdown-form.component';
import { ContactComponent } from './contact/contact.component';
import { SidePanelContainerComponent } from './side-panel-container/side-panel-container.component';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PagerComponent,
        DropdownComponent,
        DropdownFormComponent,
        ContactComponent,
        SidePanelContainerComponent
],
    exports: [
        PagerComponent,
        DropdownComponent,
        DropdownFormComponent,
        ContactComponent,
        SidePanelContainerComponent
    ]
})
export class HomeSharedModule{
}