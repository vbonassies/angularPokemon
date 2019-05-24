import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {PokemonSelectionModule} from './pokemon-selection.module';
import {PokemonSelectionComponent} from './pokemon-selection.component';
import {PokedexService} from '../../shared/services/pokedex.service';
import {SpriteService} from '../../shared/services/sprite.service';
import {DateService} from '../../shared/services/date.service';
import {AppRoutingModule} from '../../app-routing.module';
import {Router, RouterModule, Routes} from '@angular/router';
import {Location} from '@angular/common';
import {AppBaseHrefProvider} from '../../../test-helpers/app-base-href.provider';
import {DummyComponent} from '../../../test-helpers/dummy.component';
import {PokeApiService} from '../../shared/services/pokeapi.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MockHelper} from '../../../test-helpers/mock-helper';
import {StorageService} from '../../shared/services/storage.service';

const testRoutes: Routes = [
    {
        path: 'battle-arena/:pokemonName',
        component: DummyComponent
    }
];


describe('PokemonSelectionComponent', () => {
    let component: PokemonSelectionComponent;
    let fixture: ComponentFixture<PokemonSelectionComponent>;
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
        fixture = TestBed.createComponent(PokemonSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();


        MockHelper.initPokeDex(httpMock);
    });

    afterEach(() => {
        httpMock.verify();
    });


    it('Should update time every second', fakeAsync(() => {
        component.ngOnInit();
        const initialTime = component.today;
        tick(1000);
        expect(component.today.getTime()).toBeGreaterThanOrEqual(initialTime.getTime() + 1000);
        component.ngOnDestroy();
    }));

    it('Should search by regex for pokemon', async(() => {
        component.ngOnInit();
        component.pokemonNameSearch.setValue('pIk.*hu');
        component.onSearch();
        expect(component.displayedPokemons.length).toBe(1);
        expect(component.displayedPokemons[0].Name).toBe('Pikachu');
        component.pokemonNameSearch.setValue('');
        component.onSearch();
        expect(component.displayedPokemons.length).toBe(1);
        expect(component.displayedPokemons[0].Name).toBe('Pikachu');
        component.pokemonNameSearch.setValue('fakePoke');
        component.onSearch();
        expect(component.displayedPokemons.length).toBe(0);
    }));

    it('Should render time correctly', fakeAsync(() => {
        component.today = new Date('Thu May 23 2019 11:19:28');
        fixture.detectChanges();
        const h1 = fixture.debugElement.nativeElement.querySelectorAll('h1');
        expect(h1[1].textContent).toBe('Time is 11:19:28');
    }));

    it('Should redirect on pokemon choosen', fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
        fixture.ngZone.run(() => {
            component.ngOnInit();
            fixture.detectChanges();

            const buttons = fixture.debugElement.nativeElement.querySelectorAll('.card .btn.btn-sm');
            const firstPokemonExpectedPokemon = component.getAllPokemons()[0];
            expect(buttons.length).toBe(1);
            buttons[0].click();
            fixture.whenStable().then(() => {
                expect(location.path).toEqual('/battle-arena' + firstPokemonExpectedPokemon.Name);
            });

            component.ngOnDestroy();
        });
    })));

});
