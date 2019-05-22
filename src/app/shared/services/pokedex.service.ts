import {Pokedex} from '../models/pokedex/pokedex';
import {Injectable} from '@angular/core';

@Injectable()
export class PokedexService {
    private currentPokedex: Pokedex;

    getPokedex(): Pokedex {
        if (!this.currentPokedex){
            this.currentPokedex = new Pokedex();
        }
        return this.currentPokedex;
    }
}
