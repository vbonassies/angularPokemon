import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PokemonComponent } from './pokemon.component';

@NgModule({
  declarations: [
    PokemonComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    PokemonComponent
  ],
  providers: [],
  bootstrap: [PokemonComponent]
})
export class PokemonModule { }
