import {Injectable, Inject} from "@angular/core";
import {ApiService} from "./api";

@Injectable()
export class AuthService {

  constructor(private apiService:ApiService) {}

  login(user) {
    return this.apiService.post('/login', user, '登陆成功').then(this.afterLogined)
  }

  wechatLogin(callbackString) { // code=xxxxxx&state=fdddd
    return this.apiService.get(`/wechat/login?${callbackString}`).then(this.afterLogined)
  }

  private afterLogined(res) {
    sessionStorage.clear();
    sessionStorage.setItem('logined', 'true');
    sessionStorage.setItem('currentUser', JSON.stringify(res.user));
    sessionStorage.setItem('token', res.token);
  }

  logout() {
    sessionStorage.clear();
  }
}
