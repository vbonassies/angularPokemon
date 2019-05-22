import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LifeComponent } from './life.component';

@NgModule({
  declarations: [
    LifeComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    LifeComponent
  ],
  providers: [],
  bootstrap: [LifeComponent]
})
export class LifeModule { }
