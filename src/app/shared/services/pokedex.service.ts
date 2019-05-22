import {Pokedex} from '../models/pokedex/pokedex';
import {Injectable} from '@angular/core';
import {Pokemon} from '../models/pokemon/pokemon';
import {PokemonType} from '../models/pokemon/pokemon-types';

@Injectable()
export class PokedexService {
    private currentPokedex: Pokedex;

    getPokedex(): Pokedex {
        if (!this.currentPokedex) {
            this.currentPokedex = new Pokedex();
        }
        return this.currentPokedex;
    }

    getPokemon(pokemonName: string): Pokemon {
        return this.getPokedex().pokemons.find(pokemon => pokemon.Name === pokemonName);
    }

    getRandomPokemon(givenLevel: number): Pokemon {
        const pokedex = this.getPokedex();
        const randomIndex = Math.floor(Math.random() * pokedex.pokemons.length);
        const pokemon = new Pokemon(pokedex.pokemons[randomIndex].Name, givenLevel, [], PokemonType.Fire);
        return pokemon;
    }
}
