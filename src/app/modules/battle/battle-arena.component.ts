import {Component, Input, OnInit} from '@angular/core';
import {Battle} from '../../shared/models/battle/battle';
import {SelectedMove} from '../move-selector/selected-move';

@Component({
  selector: 'app-battle-arena',
  templateUrl: './battle-arena.component.html',
  styleUrls: ['./battle-arena.component.css']
})
export class BattleArenaComponent implements OnInit {
  public static ArenaNumber = 2;

  @Input()
  battle: Battle;
  chooseArena: string
  withSound = true; // put it to false to disable sound
  wasSplashDisplayed: boolean; // put it to true to disable splash screen

  shouldUserSelectMove: boolean;

  ngOnInit(): void {
      const randArena = Math.floor(Math.random() * BattleArenaComponent.ArenaNumber) + 1;
      this.chooseArena = `/assets/pictures/arenas/${randArena}.png`;
  }

  turnLoop(): void {
    while (!this.battle.isBattleEnded()) {

    }
  }

  onSplashEnded() {
    this.wasSplashDisplayed = true;
  }
}
