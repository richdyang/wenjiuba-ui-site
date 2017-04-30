import {Component} from '@angular/core';
import {UIRouter} from "@uirouter/angular";

@Component({
  selector   : 'welcome',
  templateUrl: './welcome.html',
})
export class WelcomeComponent {
  constructor(private router: UIRouter) {}

  onLogined() {
    this.router.stateService.go('i')
  }
}
