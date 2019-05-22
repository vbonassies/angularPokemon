import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class PokeApiService {

    constructor(private http: HttpClient) {}

    getPokemonStats(): Observable<string> {
        return this.http.get<string>('pikachu');
    }
}
