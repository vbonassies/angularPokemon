import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPokeapiPokemon} from '../models/pokeapi-dto/i-pokeapi-pokemon';
import {IPokeapiMoveDetail} from '../models/pokeapi-dto/i-pokeapi-move-detail';
import {IPokeapiMove} from '../models/pokeapi-dto/i-pokeapi-move';
import {map} from 'rxjs/operators';

@Injectable()
export class PokeApiService {

    public static pokeApiEndPoint = 'https://pokeapi.co/api/v2/';

    constructor(private http: HttpClient) {}

    getPokemon(pokemonName: string): Observable<IPokeapiPokemon> {
        return this.http.get<IPokeapiPokemon>(PokeApiService.pokeApiEndPoint + 'pokemon/' + pokemonName.toLowerCase())
            .pipe(map(poke => {
                poke.name = pokemonName;
                return poke;
            }));
    }

    getMoveDetail(move: IPokeapiMove): Observable<IPokeapiMoveDetail> {
        return this.http.get<IPokeapiMoveDetail>(move.move.url).pipe(map(detail => {
            detail.name = move.move.name;
            return detail;
        }));
    }
}
