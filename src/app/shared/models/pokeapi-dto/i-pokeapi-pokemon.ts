import {IPokeapiMove} from './i-pokeapi-move';
import {IPokeapiStat} from './i-pokeapi-stat';
import {IPokeapiType} from './i-pokeapi-type';

export interface IPokeapiPokemon {
    name: string;
    weight: number;
    moves: IPokeapiMove[];
    stats: IPokeapiStat[];
    types: IPokeapiType[];
}
