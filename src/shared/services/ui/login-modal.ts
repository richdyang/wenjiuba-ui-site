import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class LoginModalService {

  showed:EventEmitter<boolean>;

  constructor() {
    this.showed = new EventEmitter<boolean>();
  }

  show() {
    this.showed.emit(true);
  }

  hide() {
    this.showed.emit(false);
  }
}
