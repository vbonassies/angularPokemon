import {RouterModule, Routes} from '@angular/router';
import {DummyComponent} from '../../../test-helpers/dummy.component';
import {MoveSelectorComponent} from './move-selector.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppRoutingModule} from '../../app-routing.module';
import {PokeApiService} from '../../shared/services/pokeapi.service';
import {PokedexService} from '../../shared/services/pokedex.service';
import {StorageService} from '../../shared/services/storage.service';
import {AppBaseHrefProvider} from '../../../test-helpers/app-base-href.provider';
import {MockHelper} from '../../../test-helpers/mock-helper';
import {BehaviorSubject} from 'rxjs';
import {Move} from '../../shared/models/move/move';


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

    it('Should change cursor on keyboard input', async(() => {
        component.moveSelectRequire = true;
        component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));
        expect(component.cursor).toBe('fight');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));
        expect(component.cursor).toBe('run');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));
        expect(component.cursor).toBe('fight');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'ArrowUp' }));
        expect(component.cursor).toBe('run');
        component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'ArrowUp' }));
        expect(component.cursor).toBe('fight');
    }));

    it('Should rise observable on move selected', async(() => {
        const observable = new BehaviorSubject<Move>(undefined);
        component.moveSelectRequire = true;
        component.selectedMoveEvent = observable;
        const move = new Move('Test move', 12, 12);
        observable.subscribe(gettedMove => {
            if (gettedMove !== undefined) {
                expect(gettedMove).toBe(move);
            }
        });
        component.onMoveSelected(move);
    }));

    it('Should show pokedex on exit', async(() => {
        component.moveSelectRequire = true;
        component.exitSelectRequire = true
        component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));
        expect(component.cursor).toBe('exit');
    }));
});
