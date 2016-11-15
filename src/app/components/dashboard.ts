import {Component} from '@angular/core';
import {SessionService} from "../../shared/services/session";
import {ApiService} from "../../shared/services/api";
import {UIRouter} from "ui-router-ng2/ng2";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styles: [],
    providers: [],
})
export class DashboardComponent {
    streamEvents: any[] = []

    static resolve() {

    }

    constructor(public session:SessionService, public apiService:ApiService, private router: UIRouter) {
        
    }
}
