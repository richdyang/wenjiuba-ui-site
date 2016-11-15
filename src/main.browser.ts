import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
// Load global css
import 'styles/app.scss'

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
