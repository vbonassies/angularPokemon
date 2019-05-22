import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PokemonComponent } from './pokemon.component';
import {LifeModule} from '../life/life.module';

@NgModule({
  declarations: [
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    LifeModule
  ],
  exports: [
    PokemonComponent
  ],
  providers: [],
  bootstrap: [PokemonComponent]
})
export class PokemonModule { }
