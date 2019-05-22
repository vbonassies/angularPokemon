import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {PokemonSelectionComponent} from './pokemon-selection.component';
import {PokemonSelectionRoutingModule} from './pokemon-selection-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        PokemonSelectionComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        PokemonSelectionRoutingModule
    ],
    exports: [PokemonSelectionComponent
    ],
    providers: [],
    bootstrap: [PokemonSelectionComponent]
})
export class PokemonSelectionModule { }
