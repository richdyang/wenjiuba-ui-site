import {ClonePipeModule} from "./pipes/clone";
import {ExcerptPipeModule} from "./pipes/excerpt";
import {ApiService} from "./services/api";
import {SessionService} from "./services/session";
import {AuthService} from "./services/auth";
import {LoginModalService} from "./services/ui/login-modal";
import {FlashService} from "./services/ui/flash";
import {EventBus} from "./services/event";
import {PeekService} from "./services/peek";
import {NgModule} from "@angular/core";
import {DictService} from "./services/dict";

@NgModule({
  imports: [
    ClonePipeModule, ExcerptPipeModule
  ],
  exports: [
    ClonePipeModule, ExcerptPipeModule
  ],
  providers: [
    ApiService, SessionService, AuthService, LoginModalService, FlashService, EventBus,
    PeekService, DictService
  ],
  declarations: []
})
export class SharedModule { }
