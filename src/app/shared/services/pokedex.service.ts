import {Injectable} from '@angular/core';
import {Pokemon} from '../models/pokemon/pokemon';
import {PokemonType} from '../models/pokemon/pokemon-types';
import {PokeApiService} from './pokeapi.service';
import {availablePokemons} from '../pokemon-names-constant';
import {PokeapiMoveDetail} from '../models/pokeapi-dto/pokeapi-move-detail';
import {Observable, forkJoin, BehaviorSubject} from 'rxjs';
import {Move} from '../models/move/move';
import {PokeapiPokemon} from '../models/pokeapi-dto/pokeapi-pokemon';
import {flatMap, map} from 'rxjs/operators';


@Injectable()
export class PokedexService {
    private pokemons: Pokemon[];
    private isInitialized = new BehaviorSubject<boolean>(false);

    constructor(private pokeapi: PokeApiService) {
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
        for (const pokemonName of availablePokemons) {
            pokemonTasks.push(this.pokeapi.getPokemon(pokemonName).pipe(flatMap(poke => this.loadDetails(poke))));
        }
        forkJoin(pokemonTasks).subscribe(() => {
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

        return forkJoin(moveDetailsObservables).pipe(map(details => {
            for (const detail of details) {
                const move = new Move(detail.name, detail.accuracy, detail.power);
                pokemonItem.Moves.push(move);
            }
            this.pokemons.push(pokemonItem);
        }));
    }

    getPokemon(pokemonName: string): Pokemon {
        return this.getPokedex().find(pokemon => pokemon.Name === pokemonName);
    }

    getRandomPokemon(givenLevel: number): Pokemon {
        const pokedex = this.getPokedex();
        const randomIndex = Math.floor(Math.random() * pokedex.length);
        const pokemon = pokedex[randomIndex];
        if (!pokemon) {
            return null;
        }
        return new Pokemon(pokemon.Name, pokemon.Speed, pokemon.MaxHp, givenLevel, pokemon.Types);
    }



}
