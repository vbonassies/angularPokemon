import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PokemonSelectionComponent} from './pokemon-selection.component';
import {PokemonSelectionRoutingModule} from './pokemon-selection-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        PokemonSelectionComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        PokemonSelectionRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        PokemonSelectionComponent
    ],
})
export class PokemonSelectionModule {
}
