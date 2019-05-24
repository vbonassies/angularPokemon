import {Router, RouterModule, Routes} from '@angular/router';
import {DummyComponent} from '../../../test-helpers/dummy.component';
import {MoveSelectorComponent} from './move-selector.component';
import {async, ComponentFixture, fakeAsync, inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppRoutingModule} from '../../app-routing.module';
import {PokeApiService} from '../../shared/services/pokeapi.service';
import {PokedexService} from '../../shared/services/pokedex.service';
import {StorageService} from '../../shared/services/storage.service';
import {AppBaseHrefProvider} from '../../../test-helpers/app-base-href.provider';
import {MockHelper} from '../../../test-helpers/mock-helper';
import {Move} from '../../shared/models/move/move';
import {Location} from '@angular/common';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {BehaviorSubject} from 'rxjs';


const testRoutes: Routes = [
    {
        path: '',
        component: DummyComponent
    }
];

describe('MoveSelectorComponent', () => {
    let component: MoveSelectorComponent;
    let fixture: ComponentFixture<MoveSelectorComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DummyComponent,
                MoveSelectorComponent
            ],
            imports: [
                HttpClientTestingModule,
                AppRoutingModule,
                RouterModule.forChild(testRoutes),
            ],
            providers: [
                PokeApiService,
                PokedexService,
                StorageService,
                AppBaseHrefProvider,
            ]
        }).compileComponents();
        httpMock = TestBed.get(HttpTestingController);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MoveSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        MockHelper.initPokeDex(httpMock);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('Should start with mode select type', async(() => {
        component.moveSelectRequire = true;
        expect(component.selectType).toBe('mode');
        component.selectType = 'run';
        component.onMoveSelected(undefined);
        expect(component.selectType).toBe('mode');
    }));

    it('Should not listen keyboard if selectmove is not require', async(() => {
        component.moveSelectRequire = false;
        component.exitSelectRequire = false;
        const fakeValue = 'fakevalue';
        component.cursor = fakeValue;
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe(fakeValue);
    }));

    it('Should change cursor on keyboard input mode', async(() => {
        component.moveSelectRequire = true;
        component.selectType = 'mode';
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('fight');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('run');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('fight');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
        expect(component.cursor).toBe('run');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
        expect(component.cursor).toBe('fight');
    }));

    it('Should change cursor on keyboard input run', async(() => {
        component.moveSelectRequire = true;
        component.selectType = 'run';
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('yes');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('no');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('yes');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
        expect(component.cursor).toBe('no');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
        expect(component.cursor).toBe('yes');
    }));

    it('Should change select on mode keyboard', async(() => {
        component.moveSelectRequire = true;
        component.selectType = 'mode';
        component.cursor = 'fight';
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
        expect(component.selectType).toBe('fight');
        component.selectType = 'mode';
        component.cursor = 'run';
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
        expect(component.selectType).toBe('run');

    }));

    it('Should change select on no run keyboard', async(() => {
        component.moveSelectRequire = true;
        component.selectType = 'run';
        component.cursor = 'no';
        component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        expect(component.selectType).toBe('mode');
    }));

    it('Should raise move selected on keyboard move select', (done) => {
        component.moveSelectRequire = true;
        component.selectType = 'fight';
        component.cursor = 'move1';
        const observable = new BehaviorSubject<Move>(undefined);
        component.selectedMoveEvent = observable;
        component.pokemon = new Pokemon('test', 12, 12, 99, undefined);
        component.pokemon.Moves = [
            new Move('testMove1', 1, 1),
            new Move('testMove2', 1, 1),
            new Move('testMove3', 1, 1),
            new Move('testMove4', 1, 1)
        ];
        let expectedMove = 0;
        observable.subscribe((mv) => {
            if (mv) {
                expect(mv).toBe(component.pokemon.Moves[expectedMove]);
                if (expectedMove === 3) {
                    done();
                }
            }
        });
        component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        component.moveSelectRequire = true;
        component.selectType = 'fight';
        component.cursor = 'move2';
        expectedMove = 1;
        component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        component.moveSelectRequire = true;
        component.selectType = 'fight';
        component.cursor = 'move3';
        expectedMove = 2;
        component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        component.moveSelectRequire = true;
        component.selectType = 'fight';
        component.cursor = 'move4';
        expectedMove = 3;
        component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    });

    it('Should redirect on run with keyboard', fakeAsync(inject([Router, Location],
        (router: Router, location: Location) => {
        fixture.ngZone.run(() => {
            component.moveSelectRequire = true;
            component.selectType = 'run';
            component.cursor = 'yes';
            component.ngOnInit();
            component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual('');
            });
        });

    })));

    it('Should change cursor on keyboard input fight', async(() => {
        component.moveSelectRequire = true;
        component.selectType = 'fight';
        component.pokemon = new Pokemon('test', 12, 12, 99, undefined);
        component.pokemon.Moves = [
            new Move('testMove1', 1, 1),
            new Move('testMove2', 1, 1),
            new Move('testMove3', 1, 1),
            new Move('testMove4', 1, 1)
        ];
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
        expect(component.cursor).toBe('move1');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
        expect(component.cursor).toBe('back');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
        expect(component.cursor).toBe('move4');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
        expect(component.cursor).toBe('move3');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
        expect(component.cursor).toBe('move2');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
        expect(component.cursor).toBe('move1');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('move2');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('move3');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('move4');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('back');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('move1');
    }));

    it('Should redirect on run choosen', async(() => {
        inject([Router, Location], (router: Router, location: Location) => {
            fixture.ngZone.run(() => {
                component.ngOnInit();
                component.onRun();
                fixture.detectChanges();
                return fixture.whenStable().then(() => {
                    expect(location.path()).toEqual('');
                });
            });
        })();
    }));

    it('Should show pokedex on exit', async(() => {
        component.moveSelectRequire = true;
        component.exitSelectRequire = true;
        component.handleKeyboardEvent(new KeyboardEvent('keyup', {key: 'ArrowDown'}));
        expect(component.cursor).toBe('exit');
    }));
});
