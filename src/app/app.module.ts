// Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// External Libs
import { ModalModule } from 'ngx-bootstrap/modal';

// Modules Imports
import { AppRoutingModule } from './app-routing.module';

// Components Imports
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
