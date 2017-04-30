import {Component, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {Transition, StateService, UIRouter} from "@uirouter/angular";
import {PeekPanel} from "./peekPanel";
import {AuthService} from "../../shared/services/auth";
import {SessionService} from "../../shared/services/session";

@Component({
  selector   : 'base',
  template: `
    <div class="container" id="site-wrap">
      <div id="topbar">
        <a class="btn btn-link" (click)="toggleNav()">
            <i class="fa fa-bars"></i>
        </a>
        <img src="images/logo.png" style="vertical-align: middle; width:45px">
      </div>
      
      <aside id="sidebar" [ngClass]="{'toggled': toggled}">
        <ul class="sidebar-nav" (click)="toggleNav()">
              <li class="sidebar-brand" uiSrefActive="menu-active">
                  <a>
                     <img src="images/logo.png" style="vertical-align: middle">
                  </a>
              </li>
              <li uiSrefActive="active">
                  <a uiSref="i" *ngIf="session?.logined && session?.currentUser">
                      <i class="wj-icon wj-profile"></i>&nbsp;&nbsp;
                      {{session.currentUser.realName || session.currentUser.displayName}}
                  </a>
              </li>
              <li uiSrefActive="menu-active">
                  <a uiSref="stream">
                      <i class="wj-icon wj-stream"></i>&nbsp;&nbsp;
                      我的动态
                  </a>
              </li>
              <li uiSrefActive="menu-active">
                  <a uiSref="questions" uiSrefActive="menu-active">
                      <i class="wj-icon wj-qanda"></i>&nbsp;&nbsp;
                      有问灸答
                  </a>
              </li>
              <li uiSrefActive="menu-active">
                  <a href uiSref="cases" uiSrefActive="menu-active">
                      <i class="wj-icon wj-case"></i>&nbsp;&nbsp;
                      案例分享
                  </a>
              </li>
              <li uiSrefActive="menu-active">
                  <a href uiSref="enoter">
                      <i class="wj-icon wj-enoter"></i>&nbsp;&nbsp;
                      灸灸判读
                  </a>
              </li>
              <!--<li uiSrefActive="menu-active">-->
                  <!--<a href>-->
                      <!--<i class="wj-icon wj-event"></i>&nbsp;&nbsp;-->
                      <!--线下活动-->
                  <!--</a>-->
              <!--</li>-->
              <!--<li uiSrefActive="menu-active">-->
                  <!--<a href>-->
                      <!--<i class="wj-icon wj-interview"></i>&nbsp;&nbsp;-->
                      <!--在线访谈-->
                  <!--</a>-->
              <!--</li>-->
              <li uiSrefActive="menu-active">
                    <a href (click)="logout()">
                        <i class="fa fa-sign-out"></i>&nbsp;&nbsp;
                        退出登陆
                    </a>
                </li>
          </ul>
      </aside>
      
      <main id="main-content" peekAnchor>
        <!--<div id="main-content">-->
            <!--<div class="row">-->
              <ui-view></ui-view>
            <!--</div>-->
        <!--</div>-->
      </main>
    </div>
    `,
  styleUrls: ['./base.scss'],
  entryComponents: [PeekPanel]
})
export class BaseComponent {
  constructor(private router: UIRouter, private auth: AuthService, private session: SessionService) {
  }

  logout() {
    this.auth.logout()
    this.router.stateService.go('welecome')
  }

  toggled = false;

  toggleNav() {
      this.toggled = !this.toggled;
  }
}
