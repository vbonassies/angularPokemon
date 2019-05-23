import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BattleArenaComponent } from './battle-arena.component';
import {PokemonModule} from '../pokemon/pokemon.module';
import {UserIOModule} from '../userio/user-i-o.module';

@NgModule({
  declarations: [
    BattleArenaComponent
  ],
  imports: [
    BrowserModule,
    PokemonModule,
    UserIOModule
  ],
  exports: [
    BattleArenaComponent
  ],
})
export class BattleArenaModule { }
