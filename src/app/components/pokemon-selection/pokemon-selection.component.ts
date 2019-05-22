import {Component, OnInit} from '@angular/core';
import {PokedexService} from '../../shared/services/pokedex.service';

@Component({
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.css']
})
export class PokemonSelectionComponent implements OnInit {

    constructor(private pokedex: PokedexService) {

    }

    ngOnInit(): void {
        this.pokedex.getPokedex().pokemons
    }
}
