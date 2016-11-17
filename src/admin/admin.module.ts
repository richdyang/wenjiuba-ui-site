import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {UIRouterModule} from "ui-router-ng2";
import {NgModule} from "@angular/core";
import {WidgetModule} from "../widget/widget.module";
import {SharedModule} from "../shared/shared.module";
import {states} from "./admin.routes";
import {ShopNewComponent} from "./components/shop/shop-new";
import {ShopOverviewComponent} from "./components/shop/shop-overview";
import {StoreListComponent} from "./components/shop/store-list";
import {StoreFormComponent} from "./components/shop/store-form";
import {EmployeeFormComponent} from "./components/shop/employee-form";
import {EmployeeListComponent} from "./components/shop/employee-list";
import {AdminComponent} from "./components/admin";

@NgModule({
    imports     : [
        CommonModule, FormsModule, ReactiveFormsModule, HttpModule, // ng
        WidgetModule,  SharedModule,                        // common ui and shared module
        UIRouterModule.forChild({states: states})          // feature routes
    ],
    declarations: [
        AdminComponent,
        ShopOverviewComponent, ShopNewComponent,
        StoreListComponent, StoreFormComponent,
        EmployeeListComponent, EmployeeFormComponent
    ], // all private by default
    providers   : [], // services which are public globally
    exports     : [
        AdminComponent,
        ShopOverviewComponent, ShopNewComponent,
        StoreListComponent, StoreFormComponent,
        EmployeeListComponent, EmployeeFormComponent
    ]  // make some declarations public
})
export class AdminModule {

}

