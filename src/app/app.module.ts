import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GenericComponent } from './generic/generic.component';
import { GenericRateLimitedComponent } from './generic-rate-limited/generic-rate-limited.component';

@NgModule({
  declarations: [
    AppComponent,
    GenericComponent,
    GenericRateLimitedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
