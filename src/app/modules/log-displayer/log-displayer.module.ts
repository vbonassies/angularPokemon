import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LogDisplayerComponent } from './log-displayer.component';

@NgModule({
  declarations: [
    LogDisplayerComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    LogDisplayerComponent
  ],
  providers: [],
  bootstrap: [LogDisplayerComponent]
})
export class LogDisplayerModule { }
