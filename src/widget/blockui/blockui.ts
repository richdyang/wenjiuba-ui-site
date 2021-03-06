import {NgModule,Component,Input,AfterViewInit,OnDestroy,EventEmitter,ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-blockUI',
    template: `
        <div class="ui-blockui ui-widget-overlay" [ngStyle]="{display: blocked ? 'block' : 'none'}">
          <div class="ui-blockui-content">
              <ng-content></ng-content>
          </div>
        </div>
    `,
    styleUrls: ['./blockui.css'],
    providers: [DomHandler]
})
export class BlockUI implements AfterViewInit,OnDestroy {

    @Input() target: any;

    _blocked: boolean;

    _mask: HTMLDivElement;

    constructor(public el: ElementRef,public domHandler: DomHandler) {}

    @Input() get blocked(): boolean {
        return this._blocked;
    }

    set blocked(val: boolean) {
        this._blocked = val;

        if(this._mask) {
            if(this._blocked)
                this.block();
            else
                this.unblock();
        }
    }

    ngAfterViewInit() {
        this._mask = this.el.nativeElement.children[0];

        // if(this.target && !this.target.getBlockableElement) {
        //     throw 'Target of BlockUI must implement BlockableUI interface';
        // }
    }

    block() {
        if(this.target) {
            this.target.appendChild(this._mask); //getBlockableElement().appendChild(this._mask);
            this.target.style.position = 'relative';
        }
        else {
            document.body.appendChild(this._mask);
        }

        this._mask.style.zIndex = String(++DomHandler.zindex);
    }

    unblock() {
        this.el.nativeElement.appendChild(this._mask);
    }

    ngOnDestroy() {

    }
}

@NgModule({
    imports: [CommonModule],
    exports: [BlockUI],
    declarations: [BlockUI]
})
export class BlockUIModule { }
