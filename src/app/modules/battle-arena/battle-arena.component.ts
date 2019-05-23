import {Component, Input, OnInit} from '@angular/core';
import {Battle} from '../../shared/models/battle/battle';
import {Move} from '../../shared/models/move/move';
import {BehaviorSubject, Observable} from 'rxjs';
import {AttackLog} from '../../shared/models/battle/attack-log';
import {Router} from '@angular/router';
import {StorageService} from '../../shared/services/storage.service';
import {PokedexService} from '../../shared/services/pokedex.service';

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

  shouldUserSelectMove = false;
  shouldUserSelectForExit = false;
  selectedMoveEvent = new BehaviorSubject<Move>(undefined);
  logObservable = new BehaviorSubject<AttackLog>(undefined);
  logEvent: Observable<AttackLog> = this.logObservable.asObservable();

  constructor(private router: Router, private storage: StorageService, private pokedex: PokedexService) {}

  ngOnInit(): void {
      const randArena = Math.floor(Math.random() * BattleArenaComponent.ArenaNumber) + 1;
      this.chooseArena = `/assets/pictures/arenas/${randArena}.png`;
  }

  turnLoop(): void {
    this.shouldUserSelectMove = true;
  }

  startBattle(): void {
    setTimeout(() => {
      this.selectedMoveEvent.subscribe(userMove => {
        if (userMove) {
          this.shouldUserSelectMove = false;
          const computerPokemon = this.battle.SecondPokemon;
          const computerMoveIndex = Math.floor(Math.random() * computerPokemon.Moves.length);
          const computerMove = computerPokemon.Moves[computerMoveIndex];
          const computerMoveName = computerMove ? computerMove.Name : undefined;
          const userMoveName = userMove ? userMove.Name : undefined;
          const userAccuracy = Math.floor(Math.random() * 100) + 1;
          const computerAccuracy = Math.floor(Math.random() * 100) + 1;
          this.battle.launchTurn(userMoveName, computerMoveName, userAccuracy, computerAccuracy, this.logObservable)
              .subscribe((res) => {
                if (res) {
                  if (!this.battle.isBattleEnded()) {
                    this.turnLoop();
                  } else {
                    this.storage.saveUserPokemon(this.battle.FirstPokemon);
                    this.pokedex.applyPokemonModifications(this.battle.FirstPokemon);
                    this.shouldUserSelectForExit = true;
                  }
                }
              });
        }
      });
      this.turnLoop();
    }, 1500);
  }

  onSplashEnded() {
    this.wasSplashDisplayed = true;
    this.startBattle();
  }

  shutdownGameBoy() {
    this.router.navigate(['']);
  }
}
