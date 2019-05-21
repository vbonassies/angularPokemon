import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BattleArenaComponent } from './battle-arena.component';
import {PokemonModule} from '../pokemon/pokemon.module';
import {MoveSelectorModule} from '../move-selector/move-selector.module';

@NgModule({
  declarations: [
    BattleArenaComponent
  ],
  imports: [
    BrowserModule,
    PokemonModule,
    MoveSelectorModule
  ],
  exports: [
    BattleArenaComponent
  ],
  providers: [],
  bootstrap: [BattleArenaComponent]
})
export class BattleArenaModule { }
