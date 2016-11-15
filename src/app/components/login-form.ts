import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../shared/services/auth";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'login-form',
  template: `
  <form [formGroup]="loginForm" class="form-horizontal">

      <!--<div class="form-group">-->
        <!--<div class="col-sm-offset-3 col-sm-6">-->
          <!--<a class="btn btn-success btn-lg col-xs-12" (click)="onWechatPreLogin()" href>-->
            <!--<i class="fa fa-weixin fa-3x" style="font-size: 1.0em"> <span>微信账户登录</span></i>-->
          <!--</a>-->
          <!--<a id="wechatLogin" (click)="onWechatLogin($event)" class="hidden"></a>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div class="form-group">-->
        <!--<h4>或</h4>-->
      <!--</div>-->

      <div class="form-group">
        <!--<label for="userName" class="col-sm-3 control-label sr-only">用户名</label>-->
        <div class="col-sm-offset-3 col-sm-6">
          <input type="text" class="form-control" formControlName="userName" [(ngModel)]="user.userName" placeholder="用户名" required>
        </div>
      </div>
      <div class="form-group">
        <!--<label for="password" class="col-sm-3 control-label sr-only">密码</label>-->
        <div class="col-sm-offset-3 col-sm-6">
          <input type="password" class="form-control" formControlName="password" [(ngModel)]="user.password" placeholder="密码"
                 required>
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-6">
          <button type="submit" class="btn btn-default col-xs-12" (click)="onLogin()"
                  [disabled]="!loginForm.valid">登录
          </button>
        </div>
    
        <div class="col-sm-offset-3 col-sm-6 text-center" style="color: #ddd; margin-top: 10px">
        没有账号? 现在<a class="btn btn-link" href="/signup">注册</a>
        </div>
      </div>
    </form>
  `,
  styles: [`
  h4 {
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
   }
  
  h4:before, 
  h4:after {
    flex-grow: 1;
    height: 1px;
    content: '\\a0';
    background-color: #d1d1d1;
    position: relative;
    top: 0.5em;
  }
  
  h4:before {
    margin-right:10px;
  }
  
  h4:after {
    margin-left:10px;
  }
  `
  ],
  providers: [AuthService]
})
export class LoginForm {
  loginForm:FormGroup;
  user: any = {};

  @Output()
  logined: EventEmitter<boolean>;

  constructor(fb: FormBuilder, private authService:AuthService) {
    this.loginForm = fb.group({
      userName: [''],
      password: ['']
    });
    this.logined = new EventEmitter<boolean>();
  }

  onLogin() {
    this.authService.login(this.user).then(() => this.logined.emit(true));
  }

  onWechatPreLogin() {
    var host = 'wenjiuba.com'
    var openUrl = "https://open.weixin.qq.com/connect/qrconnect?appid=wx92c4ce15b4bd134f&redirect_uri=http%3A%2F%2F"+host+"%2Fwechat%2Flogin&response_type=code&scope=snsapi_login&formControl=123&style=white&href=http%3A%2F%2Flocalhost%3A8000%2Fcss%2Fwenjiu.app.css";//弹出窗口的url
    var iWidth=550; //弹出窗口的宽度;
    var iHeight=550; //弹出窗口的高度;
    var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
    window.open(openUrl,"","height=" + iHeight + ", width=" + iWidth + ", top=" + iTop + ", left=" + iLeft + ", scrollbars=0, toolbar=0, location=no");
  }

  onWechatLogin(event) {
    this.authService.wechatLogin(event.queryString).then(() => this.logined.emit(true))
  }
}
