import {Pokedex} from '../models/pokedex/pokedex';
import {Injectable} from '@angular/core';
import {Pokemon} from '../models/pokemon/pokemon';

@Injectable()
export class PokedexService {
    private currentPokedex: Pokedex;

    getPokedex(): Pokedex {
        if (!this.currentPokedex){
            this.currentPokedex = new Pokedex();
        }
        return this.currentPokedex;
    }

    getPokemon(pokemonName: string): Pokemon {
        return this.getPokedex().pokemons.find(pokemon => pokemon.Name === pokemonName);
    }

    getRandomPokemon(pokemonName: string): Pokemon {
        const pokedex = this.getPokedex();
        const randomIndex = Math.floor(Math.random() * pokedex.pokemons.length);
        return pokedex.pokemons[randomIndex];
    }
}
