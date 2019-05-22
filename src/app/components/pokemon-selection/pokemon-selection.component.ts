import {Component, OnInit} from '@angular/core';
import {PokedexService} from '../../shared/services/pokedex.service';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {SpriteService} from '../../shared/services/sprite.service';

@Component({
    templateUrl: './pokemon-selection.component.html',
    styleUrls: ['./pokemon-selection.component.css']
})
export class PokemonSelectionComponent implements OnInit {

    constructor(private pokedex: PokedexService, private sprite: SpriteService) {

    }

    ngOnInit(): void {
    }

    getAllPokemons(): Pokemon[] {
        return this.pokedex.getPokedex().pokemons;
    }

    getPokeSprite(pokemon: Pokemon) {
        return this.sprite.getSpriteUri(pokemon.Name, false);
    }
}
