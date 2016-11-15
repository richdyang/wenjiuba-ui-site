import {
  NgModule, Component, ElementRef, AfterViewInit, Input, Output, EventEmitter, ContentChild, OnChanges,
  forwardRef, Directive, Attribute
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header} from '../common/shared'
import {DomHandler} from '../dom/domhandler';
import {
  NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, AbstractControl,
  FormControl, Validators
} from '@angular/forms';
import {BlockUIModule} from "../blockui/blockui";
import {BlockableUI} from "../common/api";

var Delta = require('quill-delta');

declare var Quill: any;

// register value accessor
export const EDITOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Editor),
  multi: true
};

@Component({
    selector: 'p-editor',
    template: `
        <div [ngClass]="'ui-widget ui-editor-container ui-corner-all'" [class]="styleClass" #editor>
            <div class="ui-editor-toolbar ui-widget-header ui-corner-top" *ngIf="toolbar">
                <ng-content select="header"></ng-content>
            </div>
            <div class="ui-editor-toolbar ui-widget-header ui-corner-top" *ngIf="!toolbar">
                <!--<span class="ql-formats">-->
                    <!--<select class="ql-header">-->
                      <!--<option value="1">Heading</option>-->
                      <!--<option value="2">Subheading</option>-->
                      <!--<option selected>Normal</option>-->
                    <!--</select>-->
                    <!--<select class="ql-font">-->
                      <!--<option selected>Sans Serif</option>-->
                      <!--<option value="serif">Serif</option>-->
                      <!--<option value="monospace">Monospace</option>-->
                    <!--</select>-->
                <!--</span>-->
                <span class="ql-formats">
                    <button class="ql-bold"></button>
                    <button class="ql-italic"></button>
                    <button class="ql-underline"></button>
                </span>
                <span class="ql-formats">
                    <select class="ql-color"></select>
                    <select class="ql-background"></select>
                </span>
                <span class="ql-formats">
                    <button class="ql-list" value="ordered"></button>
                    <button class="ql-list" value="bullet"></button>
                    <select class="ql-align">
                        <option selected></option>
                        <option value="center"></option>
                        <option value="right"></option>
                        <option value="justify"></option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-link"></button>
                    <button class="ql-image"></button>
                    <!--<button class="ql-code-block"></button>-->
                </span>
                <!--<span class="ql-formats">-->
                    <!--<button class="ql-clean"></button>-->
                <!--</span>-->
            </div>
            <div class="ui-editor-content" [ngStyle]="style" style="background-color: #FFFFFF"></div>
            <span class="text-danger" style="font-size: .9em">{{error}}</span>
            <p-blockUI [blocked]="blocked" [target]="editor">
              <i class="fa fa-spinner fa-3x fa-spin"></i>
            </p-blockUI>
        </div>
    `,
    providers: [DomHandler,EDITOR_VALUE_ACCESSOR]
})
export class Editor implements AfterViewInit,ControlValueAccessor,BlockableUI {


    @Output() onTextChange: EventEmitter<any> = new EventEmitter();

    @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();

    @ContentChild(Header) toolbar;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() placeholder: string;

    @Input() readOnly: boolean;

    @Input() formats: string[];

    @Input() uploadHandler = (file, onSuccess, onFail) => {};

    value: string;

    onModelChange: Function = (value) => {};

    onModelTouched: Function = () => {};

    quill: any;

    constructor(public el: ElementRef, public domHandler: DomHandler) {}

    blocked = false

    error = ''

    getBlockableElement():HTMLElement {
      return this.domHandler.findSingle(this.el.nativeElement ,'div.ui-editor-content');
    }

    ngAfterViewInit() {
        let editorElement = this.domHandler.findSingle(this.el.nativeElement ,'div.ui-editor-content');
        let toolbarElement = this.domHandler.findSingle(this.el.nativeElement ,'div.ui-editor-toolbar');

        this.quill = new Quill(editorElement, {
            modules: {
                toolbar: toolbarElement
            },
            placeholder: this.placeholder,
            readOnly: this.readOnly,
            theme: 'snow',
            formats: this.formats
        });

        // Handlers can also be added post initialization
        let toolbar = this.quill.getModule('toolbar');
        toolbar.addHandler('image', (value) => {
          if (value === true) {
            let container = toolbarElement;//this.quill.container;
            let fileInput = container.querySelector('input.ql-image[type=file]');
            if (fileInput == null) {
              fileInput = document.createElement('input');
              fileInput.setAttribute('type', 'file');
              fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, image/svg+xml');
              fileInput.classList.add('ql-image');
              fileInput.addEventListener('change', () => {
                if (fileInput.files != null && fileInput.files[0] != null) {
                  this.blocked = true
                  this.uploadHandler(fileInput.files[0], (imageUrl) => {
                    let range = this.quill.getSelection(true);
                    this.quill.updateContents(new Delta()
                      .retain(range.index)
                      .delete(range.length)
                      .insert({ image: imageUrl }), 'user');
                    fileInput.value = "";
                    this.error = ''
                    this.blocked = false
                  }, (reason) => {
                    this.error = '上传失败'
                    this.blocked = false
                  });
                }
              });
              container.appendChild(fileInput);
            }
            fileInput.click();
          }
        });

        if(this.value) {
            this.quill.pasteHTML(this.value);
        }

        this.quill.on('text-change', (delta, source) => {
            let html = editorElement.children[0].innerHTML;
            let text = this.quill.getText();
            if(html == '<p><br></p>') {
                html = null;
            }

            this.onTextChange.emit({
                htmlValue: html,
                textValue: text,
                delta: delta,
                source: source
            });

            this.onModelChange(html);
        });

        this.quill.on('selection-change', (range, oldRange, source) => {
            this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
            if (range) { // null range means the loss of focus
                this.onModelTouched()
            }
        });
    }

    writeValue(value: any) : void {
        this.value = value;

        if(this.quill) {
            if(value)
                this.quill.pasteHTML(value);
            else
                this.quill.setText('');
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}

// register validator
export const EDITOR_MIN_LENGTH_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EditorMinTextLengthValidator),
  multi: true
};

@Directive({
  selector: 'p-editor[mintextlength][formControlName],p-editor[mintextlength][formControl],p-editor[mintextlength][ngModel]',
  providers: [EDITOR_MIN_LENGTH_VALIDATOR]
})
export class EditorMinTextLengthValidator implements Validator {
  private minTextLength;
  constructor(@Attribute('mintextlength') minTextLength: string) {
    this.minTextLength = minTextLength;
  }

  minTextLengthFn(minLength:number):any {
    function stripHtml(html) {
      var tmp = document.createElement("DIV"); //strip html and get pure text
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }
    return function (control:FormControl) {
      if(Validators.required(control)) return null;
      let text = stripHtml(control.value);
      return text.length >= minLength ? null : { 'minlength': { 'requiredLength': minLength, 'actualLength': text.length } };
    };
  }

  validate(control: AbstractControl) {
    return this.minTextLengthFn(this.minTextLength)(control);
  };
}

@NgModule({
    imports: [CommonModule, BlockUIModule],
    exports: [Editor, EditorMinTextLengthValidator],
    declarations: [Editor, EditorMinTextLengthValidator]
})
export class EditorModule { }
