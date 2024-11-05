import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(), 
    provideFirebaseApp(() => initializeApp({"projectId":"recetario-2b37b","appId":"1:1007079753805:web:dd6b4c9fc70405b3c2f404","storageBucket":"recetario-2b37b.appspot.com","apiKey":"AIzaSyBun4OOKcUEDg5-xOj3C698__TVpwnosUA","authDomain":"recetario-2b37b.firebaseapp.com","messagingSenderId":"1007079753805","measurementId":"G-09VCZ4FTCM"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())]
};
