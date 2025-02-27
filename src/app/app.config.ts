import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { initFontAwesome } from './core/fontawesome.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    FontAwesomeModule,
    {provide: FaIconLibrary,
      useFactory: ()=>{ const library = new FaIconLibrary; 
                        initFontAwesome(library);
                        return library ; }
    },
    provideHttpClient(),
    {provide: LOCALE_ID, useValue:'fr-FR'},
    provideAnimations(),
    importProvidersFrom(MatDialogModule,MatTooltipModule)
  ]
};
