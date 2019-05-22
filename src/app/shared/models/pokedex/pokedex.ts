import {Pokemon} from '../pokemon/pokemon';
import {PokemonType} from '../pokemon/pokemon-types';
import {availablePokemons} from './pokemon-names-constant';

export class Pokedex {

    pokemons: Pokemon[] = [];

    constructor() {
        for (const pokemonName of availablePokemons) {
            this.pokemons.push(new Pokemon(pokemonName, 10, [], PokemonType.Electric));
        }
    }
}
