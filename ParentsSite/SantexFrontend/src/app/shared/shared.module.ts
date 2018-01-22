import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { StartHeaderComponent } from "./headers/start-header/start-header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeHeaderComponent } from "./headers/home-header/home-header.component";

@NgModule({
    imports:[
        CommonModule
    ],
    declarations: [
        DropdownDirective,
        StartHeaderComponent,
        HomeHeaderComponent,
        FooterComponent
    ],
    exports: [
        CommonModule,
        DropdownDirective,
        StartHeaderComponent,
        HomeHeaderComponent,
        FooterComponent
    ]
})
export class SharedModule{
}