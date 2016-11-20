import {Component, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {Transition, StateService, UIRouter} from "ui-router-ng2";
import {PeekPanel} from "./peekPanel";
import {AuthService} from "../../shared/services/auth";
import {SessionService} from "../../shared/services/session";

@Component({
  selector   : 'base',
  template: `
    <div class="container" id="side-wrap">
      <aside id="sidebar-nav-wrap">
        <ul class="sidebar-nav">
              <li class="sidebar-brand" uiSrefActive="active">
                  <a>
                     <img src="images/logo.png" style="vertical-align: middle">
                  </a>
              </li>
              <li uiSrefActive="active">
                  <a href uiSref="i" *ngIf="session?.logined && session?.currentUser">
                      <i class="fa fa-user"></i>&nbsp;&nbsp;
                      {{session.currentUser.displayName}}
                  </a>
              </li>
              <li uiSrefActive="active">
                  <a href uiSref="stream">
                      <i class="fa fa-steam"></i>&nbsp;&nbsp;
                      我的事件
                  </a>
              </li>
              <li uiSrefActive="active">
                  <a href uiSref="questions" uiSrefActive="active">
                      <i class="fa fa-comments"></i>&nbsp;&nbsp;
                      有问灸答
                  </a>
              </li>
              <li uiSrefActive="active">
                  <a href uiSref="cases" uiSrefActive="active">
                      <i class="fa fa-cog"></i>&nbsp;&nbsp;
                      案例分享
                  </a>
              </li>
              <li uiSrefActive="active">
                  <a href>
                      <i class="fa fa-rocket"></i>&nbsp;&nbsp;
                      灸灸判读
                  </a>
              </li>
              <li uiSrefActive="active">
                  <a href>
                      <i class="fa fa-venus"></i>&nbsp;&nbsp;
                      线下活动
                  </a>
              </li>
              <li uiSrefActive="active">
                  <a href>
                      <i class="fa fa-bus"></i>&nbsp;&nbsp;
                      在线访谈
                  </a>
              </li>
              <li uiSrefActive="active">
                    <a href (click)="logout()">
                        <i class="fa fa-sign-out"></i>&nbsp;&nbsp;
                        退出登陆
                    </a>
                </li>
          </ul>
  
      </aside>
      <main id="main-content-wrap" peekAnchor>
        <!--<div id="main-content">-->
            <!--<div class="row">-->
              <ui-view></ui-view>
            <!--</div>-->
        <!--</div>-->
      </main>
    </div>
    `,
  styles: [`
  #side-wrap {
    position: relative;
    background-color: #F8F8F8;
    padding-left: 0;
    padding-right: 0;
  }
  #sidebar-nav-wrap {
    background-color: #272727;
    position: fixed;
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;
    top: 0;
    left: auto;
    right: auto;
    text-align: left;
    width: 200px;
    height: 100%;
  }
  
  #main-content-wrap {
    position: relative;
    padding-left: 215px;
    padding-right: 15px;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  #main-content {
    
  }
  
  .sidebar-nav {
      position: absolute;
      top: 0;
      width: 200px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
  
  .sidebar-nav li {
      line-height: 40px;
    }
  
  .sidebar-nav li a {
      padding-left: 25px;
      font-size: 1.05em;
    }
  
  .sidebar-nav li a {
      display: block;
      text-decoration: none;
      color: #999999;
    }
  
  .sidebar-nav li a:hover {
      text-decoration: none;
      color: #fff;
      background: rgba(255,255,255,0.2);
    }
  
  .sidebar-nav li a:active,
  .sidebar-nav li a:focus {
      text-decoration: none;
    }
  
  .sidebar-nav > .sidebar-brand {
      height: 65px;
      font-size: 18px;
      line-height: 60px;
      background-color: #1C1C1C;
    }
  
  .sidebar-nav > .sidebar-brand a {
      color: #999999;
    }
  
  .sidebar-nav > .sidebar-brand a:hover {
      color: #fff;
      background: none;
  }
  `],
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
