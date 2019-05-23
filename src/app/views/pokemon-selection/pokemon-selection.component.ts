import {Component, OnDestroy, OnInit} from '@angular/core';
import {PokedexService} from '../../shared/services/pokedex.service';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {SpriteService} from '../../shared/services/sprite.service';
import {DateService} from '../../shared/services/date.service';
import {Subscription} from 'rxjs';

@Component({
    templateUrl: './pokemon-selection.component.html',
    styleUrls: ['./pokemon-selection.component.css']
})
export class PokemonSelectionComponent implements OnInit, OnDestroy {
    today: Date = new Date();
    pokedexReady: boolean;
    private subscription: Subscription;
    private pokeDexSubscription: Subscription;

    constructor(private pokedex: PokedexService, private sprite: SpriteService, private dateService: DateService) {
    }

    ngOnInit(): void {
        this.subscription = this.dateService.getDateObservable().subscribe(date => {
            this.today = date;
        });
        this.pokeDexSubscription = this.pokedex.isPokedexInitialized().subscribe(res => {
            this.pokedexReady = res;
        });
    }

    ngOnDestroy(): void {
        this.pokeDexSubscription.unsubscribe();
        this.subscription.unsubscribe();
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
