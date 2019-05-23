import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {PokemonComponent} from './pokemon.component';
import {LifeComponent} from '../../components/life/life.component';

@NgModule({
    declarations: [
        PokemonComponent,
        LifeComponent,
    ],
    imports: [
        BrowserModule,
    ],
    exports: [
        PokemonComponent,
        LifeComponent,
    ],
})
export class PokemonModule {
}
