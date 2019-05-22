import {Injectable} from '@angular/core';


@Injectable()
export class SpriteService {

    getSpriteUri(pokemonName: string, back: boolean): string {
        return `https://img.pokemondb.net/sprites/black-white/anim/${back ? 'back-' : ''}normal/${pokemonName.toLowerCase()}.gif`;
    }
}
