import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BackgroundPokemonComponent} from './background-pokemon.component';
import {PokemonDirection} from '../../shared/models/background/pokemon-direction';
import {PokedexService} from '../../shared/services/pokedex.service';

describe('BackgroundPokemonComponent', () => {
    let component: BackgroundPokemonComponent;
    let fixture: ComponentFixture<BackgroundPokemonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BackgroundPokemonComponent],
            providers: [PokedexService],
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

});
