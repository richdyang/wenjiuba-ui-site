import {Pipe, PipeTransform, NgModule} from "@angular/core";
import * as _ from "lodash";

@Pipe({name: 'clone'})
export class ClonePipe implements PipeTransform {
    transform(obj: any): any {
        return _.cloneDeep(obj);
    }
}

@NgModule({
  imports: [],
  exports: [ClonePipe],
  declarations: [ClonePipe]
})
export class ClonePipeModule { }
