import {Injectable} from '@angular/core';
import {backgroundAvailableFlyingPokemons} from '../models/pokedex/pokemon-names-constant';


@Injectable()
export class SpriteService {

    getSpriteUri(pokemonName: string, back: boolean): string {
        return `https://img.pokemondb.net/sprites/black-white/anim/${back ? 'back-' : ''}normal/${pokemonName.toLowerCase()}.gif`;
    }

    getRandomFlyingPokemonName(random: () => number = Math.random): string {
        const max = backgroundAvailableFlyingPokemons.length;
        const index = Math.floor(random() * max);
        return backgroundAvailableFlyingPokemons[index];
    }

    getFlyingPokemonSpriteUri(pokemonName: string): string {
        return `https://play.pokemonshowdown.com/sprites/xyani/${pokemonName.toLowerCase()}.gif`;
    }
}
