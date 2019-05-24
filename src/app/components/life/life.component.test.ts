import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SpriteService} from '../../shared/services/sprite.service';
import {LifeComponent} from './life.component';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {PokemonType} from '../../shared/models/pokemon/pokemon-types';

describe('LifeComponent', () => {
    let component: LifeComponent;
    let fixture: ComponentFixture<LifeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LifeComponent],
            providers: [
                SpriteService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LifeComponent);
        component = fixture.componentInstance;

        component.pokemon = new Pokemon('Pikachu', 90, 50, 10, [PokemonType.electric]);
    }));

    it('Should render attacker pokemon correctly', () => {
        component.isFirst = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.first')).not.toBeNull();
        expect(fixture.nativeElement.querySelector('.xpProgress')).not.toBeNull();
        expect(fixture.nativeElement.querySelector('.pvLabel')).not.toBeNull();
    });

    it('Should render defendant pokemon correctly', () => {
        component.isFirst = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.second')).not.toBeNull();
        expect(fixture.nativeElement.querySelector('.xpProgress')).toBeNull();
        expect(fixture.nativeElement.querySelector('.pvLabel')).toBeNull();
    });

    it('Should render pokemon life correctly', () => {
        component.isFirst = true;
        component.pokemon.Hp = 25;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.pvLabel').textContent).toBe('25/75');
    });

    it('Should render pokemon name correctly', () => {
        component.isFirst = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.nameLabel').textContent).toBe('Pikachu');
    });

    it('Should render pokemon level correctly', () => {
        component.isFirst = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.levelLabel').textContent).toBe('Lv10');
    });

    it('Test xp progressbar width', () => {
        component.isFirst = true;
        component.pokemon.XpBeforeNextLevel = 100;
        component.pokemon.Xp = 10;
        fixture.detectChanges();
        const ele = fixture.nativeElement.querySelector('.xpProgress>.progress-bar');
        expect(ele.style.width).toBe('10%');

        component.pokemon.Xp = 50;
        fixture.detectChanges();
        expect(ele.style.width).toBe('50%');
    });

    it('Test life progressbar width', () => {
        component.pokemon.MaxHp = 50;
        component.pokemon.Hp = 50;
        fixture.detectChanges();
        const ele = fixture.nativeElement.querySelector('.hpProgress>.progress-bar');
        expect(ele.style.width).toBe('100%');
        component.pokemon.Hp = 25;
        fixture.detectChanges();
        expect(ele.style.width).toBe('50%');
    });

    it('Test life progressbar color', () => {
        component.pokemon.MaxHp = 100;
        component.pokemon.Hp = 100;
        fixture.detectChanges();
        const ele = fixture.nativeElement.querySelector('.hpProgress>.progress-bar');
        expect(ele.classList).toContain('bg-success');

        component.pokemon.Hp = 50;
        fixture.detectChanges();
        expect(ele.classList).toContain('bg-warning');

        component.pokemon.Hp = 20;
        fixture.detectChanges();
        expect(ele.classList).toContain('bg-danger');

    });

});
