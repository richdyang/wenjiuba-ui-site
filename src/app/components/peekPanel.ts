import {Component, Input, Output, EventEmitter} from '@angular/core';
import {PeekService} from "../../shared/services/peek";

@Component({
    selector   : 'peek-panel',
    template: `
    <p-offcanvas [open]="true" (onClose)="onClose()" [level]="level" [hideCloser]="!peekService.isTop(level)">
      <ui-view [name]="viewName"></ui-view>
    </p-offcanvas>
  `,
})
export class PeekPanel {
    constructor(private peekService: PeekService) {}
    @Input() viewName:string;

    @Output() close:EventEmitter<any> = new EventEmitter<any>();

    @Input() level:number

    onClose() {
        this.close.emit()
    }
}
