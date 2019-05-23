import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {BackgroundPokemonComponent} from './background-pokemon.component';
import {PokemonDirection} from '../../shared/models/background/pokemon-direction';
import {SpriteService} from '../../shared/services/sprite.service';

describe('BackgroundPokemonComponent', () => {
    let component: BackgroundPokemonComponent;
    let fixture: ComponentFixture<BackgroundPokemonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BackgroundPokemonComponent],
            providers: [
                SpriteService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BackgroundPokemonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should go right on random > 0.5', () => {
        const direction = BackgroundPokemonComponent.getDirection(() => 0.6);
        expect(direction).toBe(PokemonDirection.right);
    });
    it('Should go right on random <= 0.5', () => {
        const direction = BackgroundPokemonComponent.getDirection(() => 0.5);
        expect(direction).toBe(PokemonDirection.left);
        const direction2 = BackgroundPokemonComponent.getDirection(() => 0.4);
        expect(direction2).toBe(PokemonDirection.left);
    });

    it('Should add a pokemon every 2 seconds', fakeAsync(() => {
        component.ngOnInit();
        tick();
        expect(component.activePokemons.length).toBe(0);
        tick(2000);
        expect(component.activePokemons.length).toBe(1);
        component.ngOnDestroy();
        expect(component.activePokemons.length).toBe(0);
    }));

    it('Should remove pokemons after 10 seconds', fakeAsync(() => {
        component.ngOnInit();
        tick(2000);
        expect(component.activePokemons.length).toBe(1);
        const firstPokemon = component.activePokemons[0];
        tick(10000);
        expect(component.activePokemons).not.toContain(firstPokemon);
        component.ngOnDestroy();
        expect(component.activePokemons.length).toBe(0);
    }));

    it('Should not add pokemon is document is hidden', fakeAsync(() => {
        jest.spyOn(document, 'hidden', 'get').mockImplementation(
            () => true
        );

        component.ngOnInit();
        tick(2000);
        expect(component.activePokemons.length).toBe(0);
        component.ngOnDestroy();
    }));

});
