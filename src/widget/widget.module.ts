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
import {ChartsModule} from "./charts/charts";
import {TabsModule, TooltipModule, ModalModule} from "ng2-bootstrap";

@NgModule({
  imports     : [
    CommonModule,
    TabsModule.forRoot(), TooltipModule.forRoot(), ModalModule.forRoot(),
    MomentModule,  // 3rd-party
    BlockUIModule, InplaceModule, SelectButtonModule, GrowlModule, PickListModule,
    EditorModule, FileInputModule, FormFieldModule, OffcanvasModule, TagInputModule,
      TimelineModule, WizardModule, CalendarModule, SelectModule, ChartsModule
  ],
  declarations: [], // all private by default
  providers   : [], // services which are public globally
  exports     : [
    TabsModule, TooltipModule, ModalModule,
    BlockUIModule, InplaceModule, SelectButtonModule, GrowlModule, PickListModule,
    EditorModule, FileInputModule, FormFieldModule, OffcanvasModule, TagInputModule,
      TimelineModule, WizardModule, CalendarModule, SelectModule, ChartsModule
  ]  // make some declarations public
})
export class WidgetModule {

}
