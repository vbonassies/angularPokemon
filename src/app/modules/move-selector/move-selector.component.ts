import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Pokemon } from '../../shared/models/pokemon/pokemon';
import {Move} from '../../shared/models/move/move';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

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
  selectedMoveEvent: BehaviorSubject<Move>;

  @Output()
  log = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onMoveSelected(move: Move): void {
    this.selectedMoveEvent.next(move);
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
    this.router.navigate(['']);
  }
}
