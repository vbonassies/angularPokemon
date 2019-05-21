import {Component, Input, OnInit} from '@angular/core';
import {Battle} from '../../shared/models/battle/battle';

@Component({
  selector: 'app-battle-arena',
  templateUrl: './battle-arena.component.html',
  styleUrls: ['./battle-arena.component.css']
})
export class BattleArenaComponent implements OnInit {
  public static ArenaNumber = 2;

  @Input('battle')
  battle: Battle;
  choosenArena: string;

  ngOnInit(): void {
      const randArena = Math.floor(Math.random() * BattleArenaComponent.ArenaNumber) + 1;
      this.choosenArena = `/assets/pictures/arenas/${randArena}.png`;
  }
}
