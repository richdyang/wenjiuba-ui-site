import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule} from '@angular/forms'
import {forwardRef, Component, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

const TAGS_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TagInput),
  multi: true
}
@Component({
    selector: 'p-tag-input',
    // host: {'(labelsChange)': 'onChange($event)'/*, '(blur)': 'onTouched()'*/},
    providers: [TAGS_VALUE_ACCESSOR],
    template: `
      <div *ngIf="labels">
        <span *ngFor="let label of labels" class="label label-success" style="padding: .6em;border-radius: 3em">
          {{label.name}} 
          <em class="glyphicon glyphicon-remove" aria-hidden="true" (click)="removeLabel(label)"></em>
        </span>
        
        <span *ngIf="addAreaDisplayed">
          <input [(ngModel)]="labelToAdd.name" class="form-control custom"/>
          <em class="glyphicon glyphicon-ok text-muted text-info" aria-hidden="true" (click)="addLabel(labelToAdd)" [hidden]="!labelToAdd.name"></em>
        </span>
        
        <span *ngIf="!addAreaDisplayed">
          <em class="glyphicon glyphicon-plus text-muted" aria-hidden="true" (click)="displayAddArea()"></em>
        </span>
      </div>
    `,
    styles: [`
    span {
      display: inline-block;
      font-size: .9em;
      font-weight: normal;
      margin: .2em .2em;
    }
    span input {
      display: inline-block;
      width: 100px; 
      height: 2.2em
    }
    em {
     cursor: pointer;
    }
    `]
})
export class TagInput implements ControlValueAccessor {
  onChange = (_) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    value = value || []
    this.writeLabelsValue(value);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  // @Output()
  // labelsChange: EventEmitter<Label[]>;

  addAreaDisplayed: boolean;
  labels:Label[];
  labelToAdd:Label = {name: ''};

  constructor() {
    // this.labelsChange = new EventEmitter<Label[]>();
    this.addAreaDisplayed = false;
  }

  writeLabelsValue(labels:Label[]) {
  	this.labels = labels;
  }

  removeLabel(label:Label) {
    var index = this.labels.indexOf(label, 0);
    if (index != undefined) {
       this.labels.splice(index, 1);
       // this.labelsChange.emit(this.labels);
      this.onChange(this.labels)
    }
  }

  addLabel(label:Label) {
    this.labels.push(this.labelToAdd);
    // this.labelsChange.emit(this.labels);
    this.onChange(this.labels)
    this.labelToAdd = {name: ''};
    this.addAreaDisplayed = false;
  }

  displayAddArea() {
    this.addAreaDisplayed = true;
  }
}

export interface Label {
  name: string;
}

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [TagInput],
  declarations: [TagInput]
})
export class TagInputModule { }
