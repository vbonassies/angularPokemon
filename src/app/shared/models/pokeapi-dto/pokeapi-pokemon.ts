import {PokeapiMove} from './pokeapi-move';
import {PokeapiStat} from './pokeapi-stat';
import {PokeapiType} from './pokeapi-type';

export class PokeapiPokemon {
    name: string;
    weight: number;
    moves: PokeapiMove[];
    stats: PokeapiStat[];
    types: PokeapiType[];
}
