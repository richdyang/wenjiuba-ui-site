import {Component} from '@angular/core';

@Component({
    selector   : 'sidenav',
    template: `
    this is side menu
    <a p-offcanvas-close>111</a>
    <p-offcanvas [(open)]="_open">nested</p-offcanvas>
    <a class="btn btn-default" (click)="_open=true">open nested peek</a>
  `,
})
export class SidenavComponent {
    _open =false;
}
