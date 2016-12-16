import {Injectable} from "@angular/core";
import {Headers, Http, Response, RequestMethod} from "@angular/http";
import "rxjs/Rx";
import {SessionService} from "./session";
import {LoginModalService} from "./ui/login-modal";
import {FlashService} from "./ui/flash";
import {EventBus} from "./event";

export const API_BASE= '//api.wenjiuba.com';

@Injectable()
export class ApiService {

  defaultHeaders:Headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(public http:Http,
              private session:SessionService,
              private loginModal:LoginModalService,
              private flash:FlashService,
              private eventBus:EventBus
  ) {}

  request(url:string, method:RequestMethod, data = null, successMsg?):Promise<any> {
    let headers = new Headers(this.defaultHeaders);
    if (this.session.token) {
      headers.set('Authorization', 'Bearer ' + this.session.token);
    }
    let options = {
      method: method,
      headers: headers,
      body: data
    }
    return this.http.request(API_BASE + url, options).toPromise()
      .then(res => {return this.extractData(res, method, successMsg)})
      .catch( res => {return this.handleError(res)})
  }

  get(url:string):Promise<any> {
    return this.request(url, RequestMethod.Get);
  }

  post(url:string, data?, successMsg?):Promise<any> {
    return this.request(url, RequestMethod.Post, data, successMsg);
  }

  put(url:string, data, successMsg?):Promise<any> {
    return this.request(url, RequestMethod.Put, data, successMsg);
  }

  save(url:string, data, successMsg?) {
    if(data.hasOwnProperty('id')) {
      return this.put(url + '/' + data.id, data, successMsg)
    }

    return this.post(url, data, successMsg)
  }

  patch(url:string, data, successMsg?):Promise<any> {
    return this.request(url, RequestMethod.Patch, data, successMsg);
  }

  delete(url:string, successMsg?):Promise<any> {
    return this.request(url, RequestMethod.Delete, successMsg);
  }

  private extractData(res:Response, method: number, successMsg?:any) {
    let body = !res.text() ?  null : res.json()

    if(successMsg !== false) {
        if(method === RequestMethod.Post || method === RequestMethod.Put || method === RequestMethod.Patch) {
            let msg = successMsg || '保存成功！'
            this.eventBus.httpPostSuccess.next(msg)
        }
        if(method === RequestMethod.Delete) {
            let msg = successMsg || '删除成功！'
            this.eventBus.httpPostSuccess.next(msg)
        }
    }

    return body;
  }

  private handleError(res:Response) {
    let data = res.json();
    if(res.status == 401) {
      this.loginModal.show();
    } else if(res.status == 403) {
      this.flash.warn(data.message);
    } else if(res.status == 422) {
      this.flash.warn(data.message);
      //todo in-place errors show
      console.debug(data.debug);
    } else {
      this.eventBus.httpServerError.next('嗯哼, 问灸吧似乎出了点小问题,请稍后再试或联系我们.')
      this.flash.warn('嗯哼, 问灸吧似乎出了点小问题,请稍后再试或联系我们.');
    }

    return Promise.reject(res);
  }

  uploadOptions:UploadOptions = {
    url: API_BASE + '/upload',
    authToken: sessionStorage.getItem('token'),
    authTokenPrefix: 'Bearer',
  }


  uploadHandler = (file:File, onSuccess, onFail) => {
    let options = this.uploadOptions;
    let form = new FormData();
    form.append("Content-Type", file.type);
    form.append("file", file);
    let xhr = new XMLHttpRequest;
    xhr.open("POST", options.url, true);
    xhr.setRequestHeader('Authorization', options.authTokenPrefix + ' ' + options.authToken);
    // xhr.upload.onprogress = function(event) {
    //   var progress;
    //   progress = event.loaded / event.total * 100;
    //   return attachment.setUploadProgress(progress);
    // };
    xhr.onload = function() {
      let href, url;
      if (xhr.status === 200) {
        onSuccess(xhr.response)
      } else { // if upload fails, fallback to embed as data url
        let reader = new FileReader();
        reader.onload = (e) => {
          onSuccess(e.target['result'])
        }
        reader.readAsDataURL(file);
      }
    };
    xhr.onerror = function () {
      onFail('fail')
    };
    return xhr.send(form);
  }

};

export interface Attachment {
  file: File,
  onSuccess: (url:string) => void
}

interface UploadOptions {
  url: string,
  authToken: string,
  authTokenPrefix: string
}
