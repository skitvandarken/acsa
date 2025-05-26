import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from "./app.routes";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { TranslateLoader, provideTranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, "./i18n/", ".json");

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideTranslateService({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            }
        }),
  
        provideFirebaseApp(() => initializeApp({
            apiKey: "AIzaSyBMBs9qU1vDwl4hYYFgd1tJk3rYSZ2qdnE",
            authDomain: "acsa-458213.firebaseapp.com",
            projectId: "acsa-458213",
            storageBucket: "acsa-458213.firebasestorage.app",
            messagingSenderId: "363516187651",
            appId: "1:363516187651:web:a5241923f5ecd265dbaa36"
        })),
        provideFirestore(() => getFirestore()), provideClientHydration(withEventReplay())

    ],


};
