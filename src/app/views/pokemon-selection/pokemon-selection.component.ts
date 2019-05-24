import {Component, OnDestroy, OnInit} from '@angular/core';
import {PokedexService} from '../../shared/services/pokedex.service';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {SpriteService} from '../../shared/services/sprite.service';
import {DateService} from '../../shared/services/date.service';
import {Subscription} from 'rxjs';
import {StorageService} from '../../shared/services/storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    templateUrl: './pokemon-selection.component.html',
    styleUrls: ['./pokemon-selection.component.css']
})
export class PokemonSelectionComponent implements OnInit, OnDestroy {
    today: Date = new Date();
    pokedexReady: boolean;
    private subscription: Subscription;
    private pokeDexSubscription: Subscription;
    displayedPokemons: Pokemon[];

    searchForm: FormGroup;
    pokemonNameSearch: FormControl;

    constructor(private pokedex: PokedexService, private sprite: SpriteService, private dateService: DateService,
                private storage: StorageService) {
    }

    private initSearchForm(): void {
        this.pokemonNameSearch = new FormControl('', Validators.required);
        this.searchForm = new FormGroup({
            pokemonNameSearch: this.pokemonNameSearch
        });
    }

    ngOnInit(): void {
        this.initSearchForm();
        this.subscription = this.dateService.getDateObservable().subscribe(date => {
            this.today = date;
        });
        this.pokeDexSubscription = this.pokedex.isPokedexInitialized().subscribe(res => {
            this.pokedexReady = res;
            this.displayedPokemons = this.pokedex.getPokedex();
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

    regeneratePokemon(pokemon: Pokemon): void {
        pokemon.regenerate();
        this.pokedex.applyPokemonModifications(pokemon);
        this.storage.saveUserPokemon(pokemon);
    }

    getPotionTitle(poke: Pokemon): string {
        return `Use a ${poke.getHpPercents() === 0 ? 'hyper' : 'maxi'} potion`;
    }

    onSearch() {
        if (this.searchForm.valid) {
            const regex = new RegExp(this.pokemonNameSearch.value as string, 'i');
            this.displayedPokemons = this.displayedPokemons.filter(pok => regex.test(pok.Name));
        } else {
            this.displayedPokemons = this.pokedex.getPokedex();
        }
    }
}
