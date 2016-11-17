import {NgModule, Component, Input, forwardRef, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {NgFileSelectDirective, UploadRejected} from "ng2-uploader";

export const FILEINPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileInput),
  multi: true
};

@Component({
    selector: 'p-file-input',
    template: `
        <div *ngIf="value">
            <img *ngIf="fileType() === 'image'" [src]="value" width="50"/>
            <a *ngIf="fileType() === 'word'" [href]="value" class="btn btn-link" title="点击下载">
              <i class="fa fa-file-word-o fa-large fa-3x"></i>
            </a>
            <a *ngIf="fileType() === 'pdf'" [href]="value" class="btn btn-link" title="点击下载">
              <i class="fa fa-file-pdf-o fa-large fa-3x"></i>
            </a>
            <a *ngIf="fileType() === 'file'" [href]="value" class="btn btn-link" title="点击下载">
              <i class="fa fa-file-o fa-large fa-3x"></i>
            </a>
            <a *ngIf="!disabled" class="btn btn-link" title="重新上传" (click)="onDelete()">
              <i class="fa fa-times-circle" style="color:#e46669; font-size: 1.5em"></i>
            </a>
        </div>
 
        <div class="drop-zone" *ngIf="!value && !disabled">
            <label class="btn btn-default btn-file">
               上传文件
               <input type="file" style="display: none;"
                      ngFileSelect [options]="options" 
                      (onUpload)="onUpload($event.response)" 
                      (onUploadRejected)="onUploadRejected($event.response)">
               <span></span>
            </label>
            <p *ngIf="error">{{error}}</p>
        </div>
                
    `,
    styles: [`
      .drop-zone {
        border: dashed 1px #8c8c8c; 
        height: 90px; 
        width: 100%; 
        padding-top: 25px; 
        text-align: center;
        border-radius: 3px;
      }
    `],
    providers: [FILEINPUT_VALUE_ACCESSOR]
})
export class FileInput implements ControlValueAccessor, OnInit {


  @Input() disabled = false;

  @Input() allowedExtensions = false

  @Input() uploadOptions;

  // the url after upload
  private value:string;

  // this is an UploadOptions: {url, authToken, authTokenPrefix}
  private options = {
    filterExtensions: true,
    allowedExtensions: this.allowedExtensions, //['image/png', 'image/jpg'],
    calculateSpeed: true,
    data: {},
    customHeaders: {},
  }

  ngOnInit():void {
    // populate
    Object.assign(this.options, this.uploadOptions);
  }

  // <- output callback
  private onModelChange: Function = (_) => { };
  // <- output callback
  private onModelTouched: Function = () => { };

  // -> input
  writeValue(value:any):void {
    this.value = value;
  }

  registerOnChange(fn:any):void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn:any):void {
    this.onModelTouched = fn;
  }

  private fileType():string {
    if(this.value.endsWith('.jpg') || this.value.endsWith('.png')) return 'image'
    if(this.value.endsWith('.doc') || this.value.endsWith('.docx')) return 'word'
    if(this.value.endsWith('.pdf')) return 'pdf'
    return 'file'
  }

  private isImage():boolean {
    if(!this.value) return false;
    return this.value.endsWith('.jpg') || this.value.endsWith('.png')
  }

  private onUpload(data) {
    this.value = data
    this.onModelChange(data)
    this.error = null;
  }

  error: string;
  private onUploadRejected(e) {
    let reason = e.reason
    if(reason === UploadRejected.EXTENSION_NOT_ALLOWED) {
      this.error = '上传文件类型不允许'
    } else if(reason === UploadRejected.MAX_SIZE_EXCEEDED) {
      this.error = '超过上传大小限制'
    } else {
      this.error = '上传失败'
    }
  }

  private onDelete() {
    this.value = null;
    this.onModelChange(null)
    this.error = null;
  }
}

@NgModule({
    imports: [CommonModule],
    exports: [FileInput, NgFileSelectDirective],
    declarations: [FileInput, NgFileSelectDirective]
})
export class FileInputModule { }
