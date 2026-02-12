import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'test-tecnico-orion',
        appId: '1:527732621736:web:687ddef2be473857dc5d9d',
        databaseURL: 'https://test-tecnico-orion-default-rtdb.firebaseio.com',
        storageBucket: 'test-tecnico-orion.firebasestorage.app',
        apiKey: 'AIzaSyCCFSgukVqSisnAm7lq0JfcBKXggU8CVqw',
        authDomain: 'test-tecnico-orion.firebaseapp.com',
        messagingSenderId: '527732621736',
      }),
    ),
    provideSweetAlert2({
      fireOnInit: false,
      dismissOnDestroy: true,
    }),
    provideDatabase(() => getDatabase()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
