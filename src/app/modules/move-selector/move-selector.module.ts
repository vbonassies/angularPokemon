import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MoveSelectorComponent } from './move-selector.component';

@NgModule({
  declarations: [
    MoveSelectorComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    MoveSelectorComponent
  ],
})
export class MoveSelectorModule { }
