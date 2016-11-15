import {Injectable, EventEmitter} from "@angular/core";
import {UIRouter, Transition, StateDeclaration} from "ui-router-ng2/ng2";
import {Subject} from "rxjs/Rx";
import {PeekService} from "./peek";

@Injectable()
export class UIRouterConfig {
  constructor(private router:UIRouter, private peekService:PeekService) {
      this.registerHook()
  }

  registerHook() {
    // openPeek through clicking sref link
    
  }
}
