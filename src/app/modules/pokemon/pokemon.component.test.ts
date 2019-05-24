import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {PokemonType} from '../../shared/models/pokemon/pokemon-types';
import {PokemonComponent} from './pokemon.component';
import {PokemonModule} from './pokemon.module';
import {SpriteService} from '../../shared/services/sprite.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('PokemonComponent', () => {
    let component: PokemonComponent;
    let fixture: ComponentFixture<PokemonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                PokemonModule
            ],
            providers: [
                SpriteService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonComponent);
        component = fixture.componentInstance;

        component.pokemon = new Pokemon('Pikachu', 90, 50, 10, [PokemonType.electric]);
    }));

    it('Should show pokeball on ngInit and hide after 1250ms', fakeAsync(() => {
        component.ngOnInit();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.pokeballRenderer')).not.toBeNull();
        expect(fixture.nativeElement.querySelector('app-pokemon-life')).toBeNull();
        tick(1250);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.pokeballRenderer')).toBeNull();
        expect(fixture.nativeElement.querySelector('app-pokemon-life')).not.toBeNull();
    }));

    it('Test pokeball class', () => {
        component.pokeballVisible = true;
        component.isFirst = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.pokeballRenderer').classList).toContain('firstPokeball');

        component.isFirst = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.pokeballRenderer').classList).toContain('secondPokeball');
    });

    it('Test pokemon class', () => {
        component.pokeballVisible = true;
        component.isFirst = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.pokemonRenderer').classList).toContain('firstPokemon');

        component.isFirst = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.pokemonRenderer').classList).toContain('secondPokemon');
    });

    it('Test getPokemonAnimation', () => {
        component.pokeballVisible = true;
        expect(component.getPokemonAnimation()).toBe('initial');

        component.pokeballVisible = false;
        expect(component.getPokemonAnimation()).toBe('sleep');
    });

    it('Test pokemon animation - attacking', () => {
        component.pokemon.isAttacking = true;
        component.isFirst = true;
        expect(component.getPokemonAnimation()).toBe('attackingFirst');

        component.isFirst = false;
        expect(component.getPokemonAnimation()).toBe('attackingSecond');
    });

    it('Test pokemon animation - attacked', () => {
        component.pokemon.isAttacked = true;
        component.isFirst = true;
        expect(component.getPokemonAnimation()).toBe('attacked');

        component.isFirst = false;
        expect(component.getPokemonAnimation()).toBe('attacked');
    });

    it('Test pokemon animation - dead', () => {
        component.pokemon.Hp = 0;
        expect(component.getPokemonAnimation()).toBe('isDead');
    });

    it('Test pokeball pop - already poped', () => {
        component.pokeballVisible = false;
        expect(component.shouldPop()).toBe('alreadyPop');
        component.ngOnDestroy();
    });

    it('Test pokeball pop - first', () => {
        component.pokeballVisible = true;
        component.isFirst = true;
        expect(component.shouldPop()).toBe('pokePopFirst');
        component.ngOnDestroy();
    });

    it('Test pokeball pop - second', () => {
        component.pokeballVisible = true;
        component.isFirst = false;
        expect(component.shouldPop()).toBe('pokePopSecond');
        component.ngOnDestroy();
    });

});
