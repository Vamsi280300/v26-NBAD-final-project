import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Import Chart.js configuration
import './app/chart-config';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
