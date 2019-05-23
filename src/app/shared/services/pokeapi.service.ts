import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PokeapiPokemon} from '../models/pokeapi-dto/pokeapi-pokemon';
import {PokeapiMoveDetail} from '../models/pokeapi-dto/pokeapi-move-detail';
import {PokeapiMove} from '../models/pokeapi-dto/pokeapi-move';
import {map} from 'rxjs/operators';

@Injectable()
export class PokeApiService {

    public static pokeApiEndPoint = 'https://pokeapi.co/api/v2/';

    constructor(private http: HttpClient) {}

    getPokemon(pokemonName: string): Observable<PokeapiPokemon> {
        return this.http.get<PokeapiPokemon>(PokeApiService.pokeApiEndPoint + 'pokemon/' + pokemonName.toLowerCase())
            .pipe(map(poke => {
                poke.name = pokemonName;
                return poke;
            }));
    }

    getMoveDetail(move: PokeapiMove): Observable<PokeapiMoveDetail> {
        return this.http.get<PokeapiMoveDetail>(move.move.url).pipe(map(detail => {
            detail.name = move.move.name;
            return detail;
        }));
    }
}
