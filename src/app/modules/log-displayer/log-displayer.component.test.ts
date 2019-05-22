import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { Pokemon } from '../../shared/models/pokemon/pokemon';
import { PokemonType } from '../../shared/models/pokemon/pokemon-types';
import { LogDisplayerComponent } from './log-displayer.component';
import { AttackLog } from '../../shared/models/battle/attack-log';
import { Move } from '../../shared/models/move/move';


describe('LogDisplayerComponent', () => {
  let fixture: ComponentFixture<LogDisplayerComponent>;
  let component: LogDisplayerComponent;
  let compiled: HTMLElement;

  const poke1 = new Pokemon('Attacker', 1, [], PokemonType.Electric);
  const poke2 = new Pokemon('Enemy', 1, [], PokemonType.Electric);
  const pokemonMove = new Move('ATestMove', 'Test description', 15, 10);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogDisplayerComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LogDisplayerComponent);
    component = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;

  }));

  it('Should render damage message correctly', () => {
    component.attackLogs.push(AttackLog.attack(poke1, poke2, pokemonMove, 10));
    component.attackLogs.push(AttackLog.attack(poke2, poke1, pokemonMove, 20));

    fixture.detectChanges();

    const logs = compiled.querySelectorAll('.attackLog');
    expect(logs.length).toBe(2);
    expect(logs[0].textContent).toContain('Attacker attacks Enemy using ATestMove dealing 10 damage');
    expect(logs[1].textContent).toContain('Enemy attacks Attacker using ATestMove dealing 20 damage');
  });

  it('Should render kill message correctly', () => {
    component.attackLogs.push(AttackLog.kill(poke1, poke2));

    fixture.detectChanges();

    const log = compiled.querySelector('.attackLog');
    expect(log.textContent).toContain('Attacker killed Enemy');
    expect(log.classList).toContain('kill');
  });

  it('Should render skip round message correctly', () => {
    component.attackLogs.push(AttackLog.skipRound(poke1));

    fixture.detectChanges();

    const log = compiled.querySelector('.attackLog');
    expect(log.textContent).toContain('Attacker skips it\'s round');
  });

  it('Should render attack fail correctly', () => {
    component.attackLogs.push(AttackLog.failAttack(poke1, pokemonMove));

    fixture.detectChanges();

    const log = compiled.querySelector('.attackLog');
    expect(log.textContent).toContain('Attacker failed to use ATestMove');
    expect(log.classList).toContain('fail');
  });

});
