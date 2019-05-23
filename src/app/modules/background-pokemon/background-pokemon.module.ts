import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BackgroundPokemonComponent} from './background-pokemon.component';
import {SpriteService} from '../../shared/services/sprite.service';


@NgModule({
    declarations: [
        BackgroundPokemonComponent
    ],
    imports: [
        BrowserModule,
    ],
    exports: [
        BackgroundPokemonComponent
    ],
    providers: [SpriteService],
    bootstrap: [BackgroundPokemonComponent]
})
export class BackgroundPokemonModule { }
