import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BattleComponent } from './battle.component';
import {BattleRoutingModule} from './battle-routing.module';
import {BattleArenaModule} from '../../modules/battle/battle-arena.module';

@NgModule({
  declarations: [
    BattleComponent
  ],
  imports: [
    BrowserModule,
    BattleRoutingModule,
    BattleArenaModule
  ],
  exports: [
    BattleComponent
  ],
  providers: [],
  bootstrap: [BattleComponent]
})
export class BattleModule { }
