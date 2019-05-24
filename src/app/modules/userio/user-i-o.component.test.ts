import {UserIOComponent} from './user-i-o.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {PokemonType} from '../../shared/models/pokemon/pokemon-types';
import {UserIOModule} from './user-i-o.module';
import {AttackLog} from '../../shared/models/battle/attack-log';
import {BehaviorSubject} from 'rxjs';
import {AppRoutingModule} from '../../app-routing.module';
import {PokeApiService} from '../../shared/services/pokeapi.service';
import {PokedexService} from '../../shared/services/pokedex.service';
import {StorageService} from '../../shared/services/storage.service';
import {AppBaseHrefProvider} from '../../../test-helpers/app-base-href.provider';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserIOComponent', () => {
    let component: UserIOComponent;
    let fixture: ComponentFixture<UserIOComponent>;
    let logObservable: BehaviorSubject<AttackLog>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                AppRoutingModule,
                BrowserAnimationsModule,
                UserIOModule
            ],
            providers: [
                PokeApiService,
                PokedexService,
                StorageService,
                AppBaseHrefProvider,
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserIOComponent);
        component = fixture.componentInstance;

        component.pokemon = new Pokemon('Pikachu', 90, 50, 10, [PokemonType.electric]);

        logObservable = new BehaviorSubject<AttackLog>(undefined);
        component.logEvent = logObservable.asObservable();
    }));

    it('should log message', () => {
        component.onLogged('testlog');
        expect(component.logs[0].message).toBe('testlog');
    });

    it('Should add message on event', () => {
        component.ngOnInit();

        logObservable.next(AttackLog.message('new message'));
        expect(component.logs).toHaveLength(1);
        component.ngOnDestroy();
    });

    it('Test selector width', () => {
        const logDisplayer = fixture.nativeElement.querySelector('app-log-displayer');
        component.moveSelectRequire = false;
        component.exitSelectRequire = false;

        fixture.detectChanges();
        expect(logDisplayer.style.width).toBe('600px');

        component.exitSelectRequire = true;
        fixture.detectChanges();
        expect(logDisplayer.style.width).toBe('400px');
        component.exitSelectRequire = false;

        component.moveSelectRequire = true;
        fixture.detectChanges();
        expect(logDisplayer.style.width).toBe('400px');
        component.moveSelectRequire = false;
    });


});
