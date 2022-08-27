import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayTimeRemainingComponent } from './display-time-remaining/display-time-remaining.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DisplayTimeRemainingComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
