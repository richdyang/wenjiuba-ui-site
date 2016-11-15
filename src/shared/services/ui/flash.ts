import {Injectable} from "@angular/core";

@Injectable()
export class FlashService {
  alerts:any[] = [];

  private alert(type:string, message:string) {
    this.alerts.push({type: type, message: message})
  }

  info(message:string) {
    this.alert('info', message);
  }

  warn(message:string) {
    this.alert('warning', message);
  }

  success(message:string) {
    this.alert('success', message);
  }

  error(message:string) {
    this.alert('danger', message);
  }
}
