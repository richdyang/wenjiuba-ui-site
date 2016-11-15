import {Injectable} from "@angular/core";

@Injectable()
export class SessionService {
    get logined():any {
        return sessionStorage.getItem('logined')
    }

    get currentUser():any {
        return this.logined ? JSON.parse(sessionStorage.getItem('currentUser')) : null;
    }

    get token():string {
        return sessionStorage.getItem('token')
    }
}
