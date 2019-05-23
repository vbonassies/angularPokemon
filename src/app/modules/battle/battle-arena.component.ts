import {Component, Input, OnInit} from '@angular/core';
import {Battle} from '../../shared/models/battle/battle';
import {Move} from '../../shared/models/move/move';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-battle-arena',
  templateUrl: './battle-arena.component.html',
  styleUrls: ['./battle-arena.component.css'],
})
export class BattleArenaComponent implements OnInit {
  public static ArenaNumber = 2;

  @Input()
  battle: Battle;
  chooseArena: string;
  withSound = true; // put it to false to disable sound
  wasSplashDisplayed: boolean; // put it to true to disable splash screen

  shouldUserSelectMove: boolean;
  selectedMoveEvent = new BehaviorSubject<Move>(undefined);

  ngOnInit(): void {
      const randArena = Math.floor(Math.random() * BattleArenaComponent.ArenaNumber) + 1;
      this.chooseArena = `/assets/pictures/arenas/${randArena}.png`;
      this.selectedMoveEvent.subscribe(userMove => {
        this.shouldUserSelectMove = false;
        const computerPokemon = this.battle.SecondPokemon;
        const computerMoveIndex = Math.floor(Math.random() * computerPokemon.Moves.length);
        const computerMove = computerPokemon.Moves[computerMoveIndex];
        const computerMoveName = computerMove ? computerMove.Name : undefined;
        const userMoveName = userMove ? userMove.Name : undefined;
        const userAccuracy = Math.floor(Math.random() * 100) + 1;
        const computerAccuracy = Math.floor(Math.random() * 100) + 1;
        this.battle.launchTurn(userMoveName, computerMoveName, userAccuracy, computerAccuracy);
        if (!this.battle.isBattleEnded()) {
          this.turnLoop();
        }
      });
      this.turnLoop();
  }

  turnLoop(): void {
    this.shouldUserSelectMove = true;
  }

  onSplashEnded() {
    this.wasSplashDisplayed = true;
  }
}
