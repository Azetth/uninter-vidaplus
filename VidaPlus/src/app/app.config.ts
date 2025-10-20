import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
const firebaseConfig = {
  apiKey: "AIzaSyDt8rUjFnW54xfskLuo1rGzr0QaWUm2GHc",
  authDomain: "uniter-vidaplus.firebaseapp.com",
  projectId: "uniter-vidaplus",
  storageBucket: "uniter-vidaplus.firebasestorage.app",
  messagingSenderId: "806260238027",
  appId: "1:806260238027:web:029b8ca14d735868bc1d4e"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    // provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // provideFirestore(() => getFirestore()),]
]};
