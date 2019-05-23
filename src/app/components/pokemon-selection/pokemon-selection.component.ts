import {Component, OnInit} from '@angular/core';
import {PokedexService} from '../../shared/services/pokedex.service';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {SpriteService} from '../../shared/services/sprite.service';
import {DateService} from '../../shared/services/date.service';

@Component({
    templateUrl: './pokemon-selection.component.html',
    styleUrls: ['./pokemon-selection.component.css']
})
export class PokemonSelectionComponent implements OnInit {
    today: Date;

    constructor(private pokedex: PokedexService, private sprite: SpriteService, private dateService: DateService) {
    }

    ngOnInit(): void {
        this.dateService.getDateObservable().subscribe( date => {
            this.today = date;
        });
    }

    getAllPokemons(): Pokemon[] {
        return this.pokedex.getPokedex().pokemons;
    }

    getPokeSprite(pokemon: Pokemon) {
        return this.sprite.getSpriteUri(pokemon.Name, false);
    }
}
