import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MomentModule} from "angular2-moment/index";
import {BlockUIModule} from "./blockui/blockui";
import {FileInputModule} from "./fileinput/fileinput";
import {FormFieldModule} from "./formfield/formfield";
import {InplaceModule} from "./inplace/inplace";
import {OffcanvasModule} from "./offcanvas/offcanvas";
import {TimelineModule} from "./timeline/timeline";
import {TagInputModule} from "./taginput/taginput";
import {EditorModule} from "./editor/editor";
import {WizardModule} from "./wizard/wizard";
import {SelectButtonModule} from "./selectbutton/selectbutton";
import {GrowlModule} from "./growl/growl";

@NgModule({
  imports     : [
    CommonModule,
    MomentModule,  // 3rd-party
    BlockUIModule, InplaceModule, SelectButtonModule, GrowlModule,
    EditorModule, FileInputModule, FormFieldModule, OffcanvasModule, TagInputModule, TimelineModule, WizardModule,
  ],
  declarations: [], // all private by default
  providers   : [], // services which are public globally
  exports     : [
    BlockUIModule, InplaceModule, SelectButtonModule, GrowlModule,
    EditorModule, FileInputModule, FormFieldModule, OffcanvasModule, TagInputModule, TimelineModule, WizardModule,
  ]  // make some declarations public
})
export class WidgetModule {

}
