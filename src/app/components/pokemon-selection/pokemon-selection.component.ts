import {Component, OnInit} from '@angular/core';
import {PokedexService} from '../../shared/services/pokedex.service';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {SpriteService} from '../../shared/services/sprite.service';
import {DateService} from '../../shared/services/date.service';
import {PokemonType} from '../../shared/models/pokemon/pokemon-types';

@Component({
    templateUrl: './pokemon-selection.component.html',
    styleUrls: ['./pokemon-selection.component.css']
})
export class PokemonSelectionComponent implements OnInit {
    today: Date;
    pokedexReady: boolean;

    constructor(private pokedex: PokedexService, private sprite: SpriteService, private dateService: DateService) {
    }

    ngOnInit(): void {
        this.dateService.getDateObservable().subscribe( date => {
            this.today = date;
        });
        this.pokedex.isPokedexInitialized().subscribe(res => {
            this.pokedexReady = res;
        });
    }

    getAllPokemons(): Pokemon[] {
        return this.pokedex.getPokedex();
    }

    getPokeSprite(pokemon: Pokemon) {
        return this.sprite.getSpriteUri(pokemon.Name, false);
    }

    getPokemonTypes(pokemon: Pokemon): string {
        const stringValues: string[] = [];
        for (const type of pokemon.Types) {
            stringValues.push(type.toString());
        }
        return stringValues.join(', ');
    }
}
