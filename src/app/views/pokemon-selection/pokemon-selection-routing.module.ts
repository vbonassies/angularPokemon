import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokemonSelectionComponent} from './pokemon-selection.component';

const pokedexRoute: Routes = [{
    path: '',
    component: PokemonSelectionComponent
}, {
    path: '**',
    redirectTo: ''
}];

@NgModule({
    imports: [RouterModule.forChild(pokedexRoute)],
    exports: [RouterModule]
})
export class PokemonSelectionRoutingModule { }
