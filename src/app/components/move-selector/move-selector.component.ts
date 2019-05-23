import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Pokemon } from '../../shared/models/pokemon/pokemon';
import {Move} from '../../shared/models/move/move';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {PokedexService} from '../../shared/services/pokedex.service';
import {StorageService} from '../../shared/services/storage.service';
import {addListener} from 'cluster';

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
