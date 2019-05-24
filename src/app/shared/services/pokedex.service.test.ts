import {PokedexService} from './pokedex.service';
import {async, TestBed} from '@angular/core/testing';
import {DummyComponent} from '../../../test-helpers/dummy.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppRoutingModule} from '../../app-routing.module';
import {PokeApiService} from './pokeapi.service';
import {StorageService} from './storage.service';
import {AppBaseHrefProvider} from '../../../test-helpers/app-base-href.provider';
import {PokemonSelectionModule} from '../../views/pokemon-selection/pokemon-selection.module';
import {SpriteService} from './sprite.service';
import {DateService} from './date.service';
import {MockHelper} from '../../../test-helpers/mock-helper';
import {availablePokemons} from '../pokemon-names-constant';


describe('PokedexService', () => {
    let service: PokedexService;
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DummyComponent,
            ],
            imports: [
                HttpClientTestingModule,
                AppRoutingModule,
                PokemonSelectionModule,
            ],
            providers: [
                PokeApiService,
                {provide: PokedexService, useClass: PokedexService},
                SpriteService,
                DateService,
                StorageService,
                AppBaseHrefProvider,
            ]
        }).compileComponents();
        httpMock = TestBed.get(HttpTestingController);
    }));

    beforeEach(() => {
        service = TestBed.get(PokedexService);
        service.getPokedex();
        MockHelper.initPokeDex(httpMock);
    });

    it('Can load a pokemon', () => {
        const pokeName = 'Pikachu';
        const pokemon = service.getPokemon(pokeName);
        expect(pokemon.Name).toBe(pokeName);
    });

    it('Can load a random pokemon', () => {
        const pokeName = 'Pikachu';
        const pokeLevel = 15;
        const pokemon = service.getNewRandomPokemon(pokeLevel);
        // Because with one pokemon we can only get it
        expect(pokemon.Name).toBe(pokeName);
        expect(pokemon.Level).toBe(pokeLevel);
    });

    it('Can apply poke modifs', () => {
        const pokeName = 'Pikachu';
        const newXp = 125;
        const newLevel = 31;
        const newHp = 128;
        const pokemon = service.getPokemon(pokeName);
        pokemon.Xp = newXp;
        pokemon.Level = newLevel;
        pokemon.Hp = newHp;
        service.applyPokemonModifications(pokemon);
        const newPokemon = service.getPokemon(pokeName);
        expect(newPokemon.Xp).toBe(newXp);
        expect(newPokemon.Level).toBe(newLevel);
        expect(newPokemon.Hp).toBe(newHp);
    });

    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    it('No duplicate pokemon', () => {
        const duplicated = new Set(availablePokemons.filter(poke =>
            availablePokemons.filter(pokeInner => pokeInner === poke).length > 1));
        console.log(duplicated);
        expect(duplicated.size).toBe(0);
    });
});
