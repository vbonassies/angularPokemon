import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { Pokemon } from '../../shared/models/pokemon/pokemon';
import { PokemonType } from '../../shared/models/pokemon/pokemon-types';
import { MoveSelectorComponent } from './move-selector.component';
import { AttackLog } from '../../shared/models/battle/attack-log';


describe('MoveSelectorComponent', () => {
  let fixture: ComponentFixture<MoveSelectorComponent>;
  let component: MoveSelectorComponent;
  let compiled: HTMLElement;

  const poke1 = new Pokemon('Attacker', 1, [], PokemonType.Electric);
  const poke2 = new Pokemon('Enemy', 1, [], PokemonType.Electric);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MoveSelectorComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoveSelectorComponent);
    component = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;

  }));

  it('Should render damage message correctly', () => {
    component.attackLogs.push(new AttackLog(poke1, poke2, 10, false));
    component.attackLogs.push(new AttackLog(poke2, poke1, 15, false));

    fixture.detectChanges();

    const logs = compiled.querySelectorAll('.attackLog');
    expect(logs.length).toBe(2);
    expect(logs[0].textContent).toContain('Attacker attacks Enemy dealing 10 damage');
    expect(logs[1].textContent).toContain('Enemy attacks Attacker dealing 15 damage');
  });

  it('Should render kill message correctly', () => {
    component.attackLogs.push(new AttackLog(poke1, poke2, 10, true));

    fixture.detectChanges();

    const log = compiled.querySelector('.attackLog');
    expect(log.textContent).toContain('Attacker killed Enemy');
    expect(log.classList).toContain('kill');
  });

});
