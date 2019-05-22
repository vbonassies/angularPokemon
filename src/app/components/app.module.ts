import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleModule } from './battle/battle.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokedexService } from '../shared/services/pokedex.service';
import {PokemonSelectionModule} from './pokemon-selection/pokemon-selection.module';
import { BackgroundPokemonComponent } from './background-pokemon/background-pokemon.component';
import {SpriteService} from '../shared/services/sprite.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundPokemonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BattleModule,
    PokemonSelectionModule,
    BattleModule,
    HttpClientModule
  ],
  exports: [
    BackgroundPokemonComponent,
  ],
  providers: [PokedexService, SpriteService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
