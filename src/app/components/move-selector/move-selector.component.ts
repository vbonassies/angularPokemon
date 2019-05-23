import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import { Pokemon } from '../../shared/models/pokemon/pokemon';
import {Move} from '../../shared/models/move/move';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {PokedexService} from '../../shared/services/pokedex.service';
import {StorageService} from '../../shared/services/storage.service';

@Component({
  selector: 'app-move-selector',
  templateUrl: './move-selector.component.html',
  styleUrls: ['./move-selector.component.css']
})
export class MoveSelectorComponent implements OnInit {
  cursor: string;
  selectType = 'mode';

  @Input()
  pokemon: Pokemon;

  @Input()
  moveSelectRequire: boolean;

  @Input()
  exitSelectRequire: boolean;

  @Input()
  selectedMoveEvent: BehaviorSubject<Move>;

  @Output()
  log = new EventEmitter<string>();

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      switch (this.selectType) {
        case 'mode':
          this.moveMode();
          break;
        case 'run':
          this.moveYesNo();
          break;
        case 'fight':
          this.moveMoves(event.key === 'ArrowUp');
          break;
      }
    }
    if (event.key === 'Enter') {
      switch (this.selectType) {
        case 'mode':
          this.selectMode();
          break;
        case 'run':
          this.selectYesNo();
          break;
        case 'fight':
          this.selectMoves();
          break;
      }
    }
  }

  selectMode() {
    this.selectType = this.cursor === 'run' ? 'run' : 'fight';
    if (this.selectType === 'run') {
      this.cursor = 'no';
    } else {
      this.cursor = 'move1';
    }
  }

  selectYesNo() {
    if (this.cursor === 'yes') {
      this.onRun();
    } else {
      this.onNotRun();
      this.cursor = 'fight';
    }
  }

  selectMoves() {
    switch (this.cursor) {
      case 'move1':
        this.onMoveSelected(this.pokemon.Moves[0]);
        break;
      case 'move2':
        this.onMoveSelected(this.pokemon.Moves[1]);
        break;
      case 'move3':
        this.onMoveSelected(this.pokemon.Moves[2]);
        break;
      case 'move4':
        this.onMoveSelected(this.pokemon.Moves[3]);
        break;
      case 'back':
        this.onBackSelected();
        this.cursor = 'fight';
        break;
    }
  }

  moveMode() {
    this.cursor = this.cursor === 'fight' ? 'run' : 'fight';
  }

  moveYesNo() {
    this.cursor = this.cursor === 'yes' ? 'no' : 'yes';
  }

  moveMoves(up: boolean) {
    let finalCursor = '';
    switch (this.cursor) {
      case 'move1':
        if (this.pokemon.Moves.length === 1) {
          finalCursor = 'back';
          break;
        }
        finalCursor = up ? 'back' : 'move2';
        break;
      case 'move2':
        if (this.pokemon.Moves.length === 2) {
          finalCursor = 'back';
          break;
        }
        finalCursor = up ? 'move1' : 'move3';
        break;
      case 'move3':
        if (this.pokemon.Moves.length === 3) {
          finalCursor = 'back';
          break;
        }
        finalCursor = up ? 'move2' : 'move4';
        break;
      case 'move4':
        if (this.pokemon.Moves.length === 4) {
          finalCursor = 'back';
          break;
        }
        finalCursor = up ? 'move3' : 'back';
        break;
      case 'back':
        finalCursor = up ? 'move' + this.pokemon.Moves.length : 'move1';
        break;
    }
    this.cursor = finalCursor;
  }

  constructor(private router: Router, private pokedex: PokedexService, private storage: StorageService) {}

  ngOnInit(): void {
  }

  onMoveSelected(move: Move): void {
    this.selectedMoveEvent.next(move);
    this.selectType = 'mode';
  }

  onFightSelect() {
    this.selectType = 'fight';
  }

  onRunSelect() {
    this.log.emit('Do you really want to leave ?');
    this.selectType = 'run';
  }

  onNotRun() {
    this.selectType = 'mode';
  }

  onRun() {
    this.pokedex.applyPokemonModifications(this.pokemon);
    this.storage.saveUserPokemon(this.pokemon);
    this.router.navigate(['']);
  }

  onBackSelected() {
    this.selectType = 'mode';
  }

  onExit() {
    this.router.navigate(['']);
  }
}
