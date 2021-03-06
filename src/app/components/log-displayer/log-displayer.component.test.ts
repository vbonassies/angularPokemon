import {TestBed, async, ComponentFixture} from '@angular/core/testing';

import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {PokemonType} from '../../shared/models/pokemon/pokemon-types';
import {LogDisplayerComponent} from './log-displayer.component';
import {AttackLog} from '../../shared/models/battle/attack-log';
import {Move} from '../../shared/models/move/move';
import {PokemonTypePipe} from '../../pipes/pokemon-type.pipe';


describe('LogDisplayerComponent', () => {
    let fixture: ComponentFixture<LogDisplayerComponent>;
    let component: LogDisplayerComponent;
    let compiled: HTMLElement;

    const poke1 = new Pokemon('Attacker', 1, 100, 1, [PokemonType.electric]);
    const poke2 = new Pokemon('Enemy', 1, 100, 1, [PokemonType.electric]);
    const pokemonMove = new Move('ATestMove', 15, 10);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LogDisplayerComponent,
                PokemonTypePipe
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LogDisplayerComponent);
        component = fixture.debugElement.componentInstance;
        compiled = fixture.debugElement.nativeElement;

        component.attackLogs = [];
    }));

    it('Should render damage message correctly', () => {
        component.attackLogs.push(AttackLog.attack(poke1, poke2, pokemonMove, 10, false));
        component.attackLogs.push(AttackLog.attack(poke2, poke1, pokemonMove, 20, false));

        fixture.detectChanges();

        const logs = compiled.querySelectorAll('.attackLog');
        expect(logs.length).toBe(2);
        expect(logs[0].textContent).toBe('Attacker attacks Enemy using ATestMove dealing 10 damage');
        expect(logs[1].textContent).toBe('Enemy attacks Attacker using ATestMove dealing 20 damage');
    });

    it('Should render kill message correctly', () => {
        component.attackLogs.push(AttackLog.kill(poke1, poke2));

        fixture.detectChanges();

        const log = compiled.querySelector('.attackLog');
        expect(log.textContent).toBe('Attacker killed Enemy');
        expect(log.classList).toContain('kill');
    });

    it('Should render skip round message correctly', () => {
        component.attackLogs.push(AttackLog.skipRound(poke1));

        fixture.detectChanges();

        const log = compiled.querySelector('.attackLog');
        expect(log.textContent).toBe('Attacker skips it\'s round');
    });

    it('Should render attack fail correctly', () => {
        component.attackLogs.push(AttackLog.failAttack(poke1, pokemonMove));

        fixture.detectChanges();

        const log = compiled.querySelector('.attackLog');
        expect(log.textContent).toBe('Attacker failed to use ATestMove');
        expect(log.classList).toContain('fail');
    });

    it('Should render message correctly', () => {
        const message = 'My awesome message';
        component.attackLogs.push(AttackLog.message(message));

        fixture.detectChanges();

        const log = compiled.querySelector('.attackLog');
        expect(log.textContent).toBe(message);
    });

    it('Should render critical correctly', () => {
        component.attackLogs.push(AttackLog.attack(poke1, poke2, pokemonMove, 10, true));

        fixture.detectChanges();

        const logs = compiled.querySelectorAll('.attackLog span');
        expect(logs.length).toBe(2);
        expect(logs[0].textContent).toBe('Attacker attacks Enemy using ATestMove dealing 10 damage');
        expect(logs[1].textContent).toBe(' It\'s super effective!!!');
        expect(logs[1].classList).toContain('span-critic');

        const log = compiled.querySelector('.attackLog');
        expect(log.textContent).toBe('Attacker attacks Enemy using ATestMove dealing 10 damage It\'s super effective!!!');
    });

    it('Should render level up correctly', () => {
        component.attackLogs.push(AttackLog.levelUp(poke1));
        fixture.detectChanges();

        const log = compiled.querySelector('.attackLog');
        expect(log.textContent).toBe('Attacker is now level 1!');
    });

    it('Should render level up correctly', () => {
        component.attackLogs.push(AttackLog.wonXp(poke1, 100));
        fixture.detectChanges();

        const log = compiled.querySelector('.attackLog');
        expect(log.textContent).toBe('Attacker won 100 XPs');
    });
});
