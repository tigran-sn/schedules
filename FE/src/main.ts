import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from '../src/app/app.routes';
import { provideRouter } from '@angular/router';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(withInterceptorsFromDi()), // Enable interceptors
//     { provide: HTTP_INTERCEPTORS, useClass: ScheduleInterceptor, multi: true },
//   ],
// });

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
