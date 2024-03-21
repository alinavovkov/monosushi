import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import "../node_modules/bootstrap/scss/bootstrap";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
