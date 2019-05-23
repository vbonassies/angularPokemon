import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BattleModule} from './views/battle/battle.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PokedexService} from './shared/services/pokedex.service';
import {PokemonSelectionModule} from './views/pokemon-selection/pokemon-selection.module';
import {SpriteService} from './shared/services/sprite.service';
import {HttpClientModule} from '@angular/common/http';
import {DateService} from './shared/services/date.service';
import {PokeApiService} from './shared/services/pokeapi.service';
import {BackgroundPokemonComponent} from './components/background-pokemon/background-pokemon.component';

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
    providers: [PokedexService, SpriteService, DateService, PokeApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
