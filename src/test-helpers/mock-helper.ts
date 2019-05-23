import {PikachuApiResponse} from './httpMocks/pikachu';
import {HttpTestingController} from '@angular/common/http/testing';
import {tick} from '@angular/core/testing';
import {pokemon_moves_5} from './httpMocks/moves/move_5';
import {pokemon_moves_6} from './httpMocks/moves/move_6';
import {pokemon_moves_9} from './httpMocks/moves/move_9';
import {pokemon_moves_21} from './httpMocks/moves/moves_21';

export class MockHelper {
    static initPokeDex(httpMock: HttpTestingController) {
        const pikachuRequest = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu', 'Get pokemon call');
        pikachuRequest.flush(PikachuApiResponse);

        const move5 = httpMock.expectOne('https://pokeapi.co/api/v2/move/5/', 'Get move 5 call');
        move5.flush(pokemon_moves_5);

        const move6 = httpMock.expectOne('https://pokeapi.co/api/v2/move/6/', 'Get move 6 call');
        move6.flush(pokemon_moves_6);

        const move9 = httpMock.expectOne('https://pokeapi.co/api/v2/move/9/', 'Get move 9 call');
        move9.flush(pokemon_moves_9);

        const move21 = httpMock.expectOne('https://pokeapi.co/api/v2/move/21/', 'Get move 21 call');
        move21.flush(pokemon_moves_21);

    }
}
