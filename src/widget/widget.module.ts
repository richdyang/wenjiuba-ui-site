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
import {CalendarModule} from "./calendar/calendar";
import {PickListModule} from "./picklist/picklist";
import {SelectModule} from "./select/select";

@NgModule({
  imports     : [
    CommonModule,
    MomentModule,  // 3rd-party
    BlockUIModule, InplaceModule, SelectButtonModule, GrowlModule, PickListModule,
    EditorModule, FileInputModule, FormFieldModule, OffcanvasModule, TagInputModule,
      TimelineModule, WizardModule, CalendarModule, SelectModule
  ],
  declarations: [], // all private by default
  providers   : [], // services which are public globally
  exports     : [
    BlockUIModule, InplaceModule, SelectButtonModule, GrowlModule, PickListModule,
    EditorModule, FileInputModule, FormFieldModule, OffcanvasModule, TagInputModule,
      TimelineModule, WizardModule, CalendarModule, SelectModule
  ]  // make some declarations public
})
export class WidgetModule {

}
