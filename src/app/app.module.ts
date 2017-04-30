import {NgModule, Injectable} from '@angular/core'
import {states} from "./app.routes";
import {AppComponent} from "./components/app";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {BaseComponent} from "./components/base";
import {SidenavComponent} from "./components/sidenav";
import {QandaModule} from "../qanda/qanda.module";
import {UIRouterModule, RootModule, UIRouter, Transition, StateDeclaration} from "@uirouter/angular";
import {PeekPanel} from "./components/peekPanel";
import {PeekAnchor} from "./components/peekAnchor";
import {PeekService} from "../shared/services/peek";
import {CaseModule} from "../case/case.module";
import {WelcomeComponent} from "./components/welcome";
import {LoginForm} from "./components/login-form";
import {StreamModule} from "../stream/stream.module";
import {EventBus} from "../shared/services/event";
import {SignupForm} from "./components/signup-form";
import {WidgetModule} from "../widget/widget.module";
import {SharedModule} from "../shared/shared.module";
import {DashboardModule} from "../dashboard/dashboard.module";
import {EnoterModule} from "../enoter/enoter.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpModule, // ng
        UIRouterModule.forRoot(<RootModule>{states: states, configClass: PeekService}),           // root routes
        WidgetModule, SharedModule,            // common ui and shared module
        QandaModule,                            // feature module
        CaseModule,
        StreamModule,
        DashboardModule,
        EnoterModule,
    ],
    declarations: [
        AppComponent, BaseComponent, WelcomeComponent, LoginForm, SignupForm, SidenavComponent,
        PeekAnchor, PeekPanel
    ],
    providers: [
        // {provide: LocationStrategy, useClass: PathLocationStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
