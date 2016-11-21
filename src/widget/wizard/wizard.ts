import {NgModule,Component,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem} from '../common/api';
import {UIRouter} from "ui-router-ng2/ng2";

@Component({
    selector: 'p-wizard',
    template: `
    <div class="ui-wizard text-center">
      <span class="ui-wizard-steps">
          <a [ngClass]="{active: i==activeIndex}" class="ui-wizard-step" *ngFor="let item of model; let i = index" (click)="itemClick($event, item, i)">
            <span class="ui-wizard-step-number">{{i+1}}</span> 
            <span class="ui-wizard-step-title"><i class="step.iconClasses"></i>{{item.label}}</span>
          </a>
      </span>
    </div>
    `,
    styleUrls: ['./wizard.css']
})
export class Wizard {

    @Input() activeIndex: number = 0;

    @Input() model: MenuItem[];

    @Input() readonly: boolean =  false;

    // @Input() style: any;
    //
    // @Input() styleClass: string;

    @Output() activeIndexChange: EventEmitter<any> = new EventEmitter();

    constructor(public router: UIRouter) {}

    itemClick(event: Event, item: MenuItem, i: number) {
        if(this.readonly) {
            return;
        }

        if(i > this.activeIndex) return;

        this.activeIndexChange.emit(i);

        if(item.disabled) {
            event.preventDefault();
            return;
        }

        if(!item.url||item.routerLink) {
            event.preventDefault();
        }

        if(item.command) {
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }

            item.eventEmitter.emit({
                originalEvent: event,
                item: item,
                index: i
            });
        }

        if(item.routerLink) {
            this.router.stateService.go(item.routerLink);
        }
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Wizard],
    declarations: [Wizard]
})
export class WizardModule { }
