import {PikachuApiResponse} from './httpMocks/pikachu';
import {HttpTestingController} from '@angular/common/http/testing';
import {tick} from '@angular/core/testing';
import {pokemonMoves5} from './httpMocks/moves/move_5';
import {pokemonMoves6} from './httpMocks/moves/move_6';
import {pokemonMoves9} from './httpMocks/moves/move_9';
import {pokemonMoves21} from './httpMocks/moves/moves_21';

export class MockHelper {
    static initPokeDex(httpMock: HttpTestingController) {
        const pikachuRequest = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu', 'Get pokemon call');
        pikachuRequest.flush(PikachuApiResponse);

        const move5 = httpMock.expectOne('https://pokeapi.co/api/v2/move/5/', 'Get move 5 call');
        move5.flush(pokemonMoves5);

        const move6 = httpMock.expectOne('https://pokeapi.co/api/v2/move/6/', 'Get move 6 call');
        move6.flush(pokemonMoves6);

        const move9 = httpMock.expectOne('https://pokeapi.co/api/v2/move/9/', 'Get move 9 call');
        move9.flush(pokemonMoves9);

        const move21 = httpMock.expectOne('https://pokeapi.co/api/v2/move/21/', 'Get move 21 call');
        move21.flush(pokemonMoves21);

    }
}
