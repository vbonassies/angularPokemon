import {Injectable} from '@angular/core';
import {Pokemon} from '../models/pokemon/pokemon';


@Injectable()
export class StorageService {

    getUserPokemonXp(pokemonName: string): number {
        const gettedXp = localStorage.getItem(pokemonName + '_XP');
        if (!gettedXp) {
            return 0;
        } else {
            return +gettedXp;
        }
    }

    getUserPokemonHp(pokemonName: string): number {
        const gettedHp = localStorage.getItem(pokemonName + '_HP');
        if (!gettedHp) {
            return -1;
        } else {
            return +gettedHp;
        }
    }

    getUserPokemonLevel(pokemonName: string): number {
        const gettedLevel = localStorage.getItem(pokemonName + '_LEVEL');
        if (!gettedLevel) {
            return 1;
        } else {
            let casted = +gettedLevel;
            if (casted < 0) {
                casted = 0;
            }
            if (casted > 99) {
                casted = 99;
            }
            return casted;
        }
    }

    saveUserPokemon(pokemon: Pokemon): void {
        if (!pokemon) {
            return;
        }
        const pokemonName = pokemon.Name;
        localStorage.setItem(pokemonName + '_LEVEL', pokemon.Level.toString());
        localStorage.setItem(pokemonName + '_HP', pokemon.Hp.toString());
        localStorage.setItem(pokemonName + '_XP', pokemon.Xp.toString());
    }
}
