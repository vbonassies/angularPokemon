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

    // this.pokemons.push(new Pokemon('Pikachu', 10, [], PokemonType.Electric),
    //     new Pokemon('Charizard', 5, [], PokemonType.Fire),
    //     new Pokemon('Bulbasaur', 8, [], PokemonType.Grass),
    //     new Pokemon('Venusaur', 7, [], PokemonType.Grass),
    //     new Pokemon('Charmander', 6, [], PokemonType.Fire),
    //     new Pokemon('Squirtle', 11, [], PokemonType.Water),
    //     new Pokemon('Blastoise', 4, [], PokemonType.Water),
    //     new Pokemon('Caterpie', 1, [], PokemonType.Grass),
    //     new Pokemon('Sandshrew', 9, [], PokemonType.Grass),
    //     new Pokemon('Vulpix', 8, [], PokemonType.Fire),
    //     new Pokemon('Oddish', 2, [], PokemonType.Grass));
}
