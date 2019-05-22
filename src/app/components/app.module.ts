import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BattleModule} from './battle/battle.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PokedexService} from '../shared/services/pokedex.service';
import {SpriteService} from '../shared/services/sprite.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BattleModule
  ],
  providers: [PokedexService, SpriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
