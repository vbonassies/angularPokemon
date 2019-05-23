import {Injectable} from '@angular/core';
import {Pokemon} from '../models/pokemon/pokemon';
import {PokemonType} from '../models/pokemon/pokemon-types';
import {PokeApiService} from './pokeapi.service';
import {PokeapiMoveDetail} from '../models/pokeapi-dto/pokeapi-move-detail';
import {Observable, forkJoin, BehaviorSubject} from 'rxjs';
import {Move} from '../models/move/move';
import {PokeapiPokemon} from '../models/pokeapi-dto/pokeapi-pokemon';
import {flatMap, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {StorageService} from './storage.service';


@Injectable()
export class PokedexService {
    private pokemons: Pokemon[];
    private isInitialized = new BehaviorSubject<boolean>(false);
    private allowedPokemons: string[];

    constructor(private pokeapi: PokeApiService, private storage: StorageService) {
        this.allowedPokemons = environment.availablePokemons;
        this.initializePokedex();
    }

    getPokedex(): Pokemon[] {
        return this.pokemons;
    }

    isPokedexInitialized(): Observable<boolean> {
        return this.isInitialized.asObservable();
    }

    private initializePokedex(): void {
        this.pokemons = [];
        const pokemonTasks: Observable<void>[] = [];
        for (const pokemonName of this.allowedPokemons) {
            pokemonTasks.push(this.pokeapi.getPokemon(pokemonName).pipe(flatMap(poke => this.loadDetails(poke))));
        }
        forkJoin(pokemonTasks).subscribe(() => {
            this.getPokedex().sort((pokea, pokeb) => {
                if (pokea.Name < pokeb.Name) {
                    return -1;
                }
                if (pokea.Name > pokeb.Name) {
                    return 1;
                }
                return 0;
            })
            this.isInitialized.next(true);
        });
    }

    private loadDetails(pokemon: PokeapiPokemon): Observable<void> {
        const speed = pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat;
        const hp = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
        const types: PokemonType[] = [];
        for (const type of pokemon.types) {
            const castedType = PokemonType[type.type.name];
            if (castedType) {
                types.push(castedType);
            }
        }
        const pokemonItem = new Pokemon(pokemon.name, +speed, +hp, 1, types);
        const moveDetailsObservables: Observable<PokeapiMoveDetail>[] = [];
        const moveCount = pokemon.moves.length > 4 ? 4 : pokemon.moves.length;
        for (let i = 0; i < moveCount; i++) {
            moveDetailsObservables.push(this.pokeapi.getMoveDetail(pokemon.moves[i]));
        }

        pokemonItem.setLevel(this.storage.getUserPokemonLevel(pokemon.name));
        const gettedHp = this.storage.getUserPokemonHp(pokemon.name);
        if (gettedHp >= 0 && gettedHp <= pokemonItem.MaxHp) {
            pokemonItem.Hp = gettedHp;
        }
        const gettedXp = this.storage.getUserPokemonXp(pokemon.name);
        if (gettedXp >= 0 && gettedXp <= pokemonItem.XpBeforeNextLevel) {
            pokemonItem.Xp = gettedXp;
        }

        return forkJoin(moveDetailsObservables).pipe(map(details => {
            for (const detail of details) {
                const move = new Move(detail.name, detail.accuracy, detail.power);
                pokemonItem.Moves.push(move);
            }
            this.pokemons.push(pokemonItem);
        }));
    }

    getPokemon(pokemonName: string): Pokemon {
        const pokedex = this.getPokedex();
        const pokemon = pokedex.find(pok => pok.Name === pokemonName);
        if (!pokemon) {
            return null;
        }
        const newPokemon = new Pokemon(pokemon.Name, pokemon.Speed, pokemon.ReferenceHp, pokemon.Level, pokemon.Types);
        newPokemon.Hp = pokemon.Hp;
        newPokemon.Xp = pokemon.Xp;
        newPokemon.Moves = [...pokemon.Moves];
        return newPokemon;
    }

    getNewRandomPokemon(givenLevel: number): Pokemon {
        const pokedex = this.getPokedex();
        const randomIndex = Math.floor(Math.random() * pokedex.length);
        const pokemon = pokedex[randomIndex];
        if (!pokemon) {
            return null;
        }
        const newPokemon = new Pokemon(pokemon.Name, pokemon.Speed, pokemon.ReferenceHp, givenLevel, pokemon.Types);
        newPokemon.Moves = [...pokemon.Moves];
        return newPokemon;
    }

    applyPokemonModifications(pokemon: Pokemon): void {
        if (!pokemon) {
            return;
        }
        const pokedex = this.getPokedex();
        const pokemonIndex = pokedex.findIndex(pok => pok.Name === pokemon.Name);
        if (pokemonIndex === -1) {
            return;
        }
        pokedex.splice(pokemonIndex, 1, pokemon);
    }
}
