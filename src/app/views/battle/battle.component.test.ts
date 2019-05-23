import {TestBed, async, ComponentFixture} from '@angular/core/testing';

import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {BattleComponent} from './battle.component';
import {BattleModule} from './battle.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppRoutingModule} from '../../app-routing.module';
import {AppBaseHrefProvider} from '../../../test-helpers/app-base-href.provider';
import {PokedexService} from '../../shared/services/pokedex.service';
import {PokeApiService} from '../../shared/services/pokeapi.service';
import {StorageService} from '../../shared/services/storage.service';


describe('BattleComponent', () => {
    let fixture: ComponentFixture<BattleComponent>;
    let component: BattleComponent;
    let compiled: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                AppRoutingModule,
                BattleModule,
            ],
            providers: [
                AppBaseHrefProvider,
                PokedexService,
                PokeApiService,
                StorageService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BattleComponent);
        component = fixture.debugElement.componentInstance;
        compiled = fixture.debugElement.nativeElement;
    }));

    it('Level should be -5 to +5 of current level', () => {
        const poke = new Pokemon('fake', 10, 10, 10, []);

        const low = BattleComponent.getEnemyLevel(poke, () => 0);
        expect(low).toBe(5);
        const max = BattleComponent.getEnemyLevel(poke, () => 1);
        expect(max).toBe(15);
    });

    it('level should never be lower than 1', () => {
        const poke = new Pokemon('fake', 10, 10, 1, []);

        const low = BattleComponent.getEnemyLevel(poke, () => 0);
        expect(low).toBe(1);
    });

    it('level should never be higher than 99', () => {
        const poke = new Pokemon('fake', 10, 10, 99, []);

        const low = BattleComponent.getEnemyLevel(poke, () => 1);
        expect(low).toBe(99);
    });

});
