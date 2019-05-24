import {Router, RouterModule, Routes} from '@angular/router';
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {Location} from '@angular/common';
import {BattleArenaComponent} from './battle-arena.component';
import {DummyComponent} from '../../../test-helpers/dummy.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppRoutingModule} from '../../app-routing.module';
import {PokeApiService} from '../../shared/services/pokeapi.service';
import {PokedexService} from '../../shared/services/pokedex.service';
import {SpriteService} from '../../shared/services/sprite.service';
import {DateService} from '../../shared/services/date.service';
import {StorageService} from '../../shared/services/storage.service';
import {AppBaseHrefProvider} from '../../../test-helpers/app-base-href.provider';
import {BattleArenaModule} from './battle-arena.module';
import {MockHelper} from '../../../test-helpers/mock-helper';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

const testRoutes: Routes = [
    {
        path: '',
        component: DummyComponent
    }
];

describe('LogBattleArenaComponent', () => {
    let component: BattleArenaComponent;
    let fixture: ComponentFixture<BattleArenaComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DummyComponent,
            ],
            imports: [
                HttpClientTestingModule,
                AppRoutingModule,
                RouterModule.forChild(testRoutes),
                BattleArenaModule,
                NoopAnimationsModule,
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
        fixture = TestBed.createComponent(BattleArenaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        MockHelper.initPokeDex(httpMock);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('Should redirect to home', fakeAsync(() => {
        inject([Router, Location], (router: Router, location: Location) => {
            fixture.ngZone.run(() => {
                component.ngOnInit();
                fixture.detectChanges();

                component.shutdownGameBoy();
                tick(1000);
                fixture.whenStable().then(() => {
                    expect(location.path()).toEqual('');
                });
            });
        })();
    }));
});
