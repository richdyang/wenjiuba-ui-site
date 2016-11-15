import {Component} from '@angular/core';
import {UIRouter} from "ui-router-ng2/ng2";

@Component({
  selector   : 'welcome',
  templateUrl: './welcome.html',
})
export class WelcomeComponent {
  constructor(private router: UIRouter) {}

  onLogined() {
    this.router.stateService.go('dashboard')
  }
}
