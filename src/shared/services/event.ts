import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Rx";

@Injectable()
export class EventBus {
  httpPostSuccess: Subject<any> = new Subject(); // Post/Put/Patch 2xx
  httpServerError: Subject<any> = new Subject(); // 5xx
  
  questionCreated: Subject<any> = new Subject();
  caseCreated: Subject<any> = new Subject();
}
