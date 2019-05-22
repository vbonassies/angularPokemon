import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Pokemon } from '../../shared/models/pokemon/pokemon';
import {SelectedMove} from './selected-move';
import {Move} from '../../shared/models/move/move';
import {SelectedMoveType} from './selected-move-type';

@Component({
  selector: 'app-move-selector',
  templateUrl: './move-selector.component.html',
  styleUrls: ['./move-selector.component.css']
})
export class MoveSelectorComponent implements OnInit {

  @Input()
  pokemon: Pokemon;

  @Input()
  moveSelectRequire: boolean;

  @Output()
  selectedMoveEvent = new EventEmitter<SelectedMove>();

  ngOnInit(): void {
  }

  onMoveSelected(move: Move, moveType: SelectedMoveType): void {
    const selectedMove = new SelectedMove();
    selectedMove.Move = move;
    selectedMove.MoveType = moveType;
    this.selectedMoveEvent.emit(selectedMove);
  }
}
