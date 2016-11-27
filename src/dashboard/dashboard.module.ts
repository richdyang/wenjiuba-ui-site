import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {UIRouterModule} from "ui-router-ng2";
import {NgModule} from "@angular/core";
import {WidgetModule} from "../widget/widget.module";
import {SharedModule} from "../shared/shared.module";
import {states} from "./dashboard.routes";
import {ShopNewComponent} from "./components/shop/shop-new";
import {ShopOverviewComponent} from "./components/shop/shop-overview";
import {StoreListComponent} from "./components/shop/store-list";
import {StoreFormComponent} from "./components/shop/store-form";
import {EmployeeFormComponent} from "./components/shop/employee-form";
import {EmployeeListComponent} from "./components/shop/employee-list";
import {ProductListComponent} from "./components/shop/product-list";
import {ProductFormComponent} from "./components/shop/product-form";
import {ProductPackageFormComponent} from "./components/shop/product-package-form";
import {CustomerFormComponent} from "./components/shop/customer-form";
import {CustomerListComponent} from "./components/shop/customer-list";
import {CustomerAccountComponent} from "./components/shop/customer-account";
import {DashboardComponent} from "./components/dashboard";

@NgModule({
    imports     : [
        CommonModule, FormsModule, ReactiveFormsModule, HttpModule, // ng
        WidgetModule,  SharedModule,                        // common ui and shared module
        UIRouterModule.forChild({states: states})          // feature routes
    ],
    declarations: [
        DashboardComponent,
        ShopOverviewComponent, ShopNewComponent,
        StoreListComponent, StoreFormComponent,
        EmployeeListComponent, EmployeeFormComponent,
        ProductListComponent, ProductFormComponent, ProductPackageFormComponent,
        CustomerListComponent, CustomerFormComponent, CustomerAccountComponent
    ], // all private by default
    providers   : [], // services which are public globally
    exports     : [
        DashboardComponent,
        ShopOverviewComponent, ShopNewComponent,
        StoreListComponent, StoreFormComponent,
        EmployeeListComponent, EmployeeFormComponent,
        ProductListComponent, ProductFormComponent, ProductPackageFormComponent,
        CustomerListComponent, CustomerFormComponent, CustomerAccountComponent
    ]  // make some declarations public
})
export class DashboardModule {

}

