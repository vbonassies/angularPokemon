import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UserIOComponent } from './user-i-o.component';
import {LogDisplayerModule} from '../log-displayer/log-displayer.module';
import {MoveSelectorModule} from '../move-selector/move-selector.module';

@NgModule({
  declarations: [
    UserIOComponent
  ],
  imports: [
    BrowserModule,
    LogDisplayerModule,
    MoveSelectorModule
  ],
  exports: [
    UserIOComponent
  ],
  providers: [],
  bootstrap: [UserIOComponent]
})
export class UserIOModule { }
