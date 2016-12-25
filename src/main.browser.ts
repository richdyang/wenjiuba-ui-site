import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
// Load global css
import 'styles/app.scss'
import {enableProdMode} from "@angular/core";

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
