import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Pokemon } from '../../shared/models/pokemon/pokemon';
import {SelectedMove} from '../move-selector/selected-move';

@Component({
  selector: 'app-user-io',
  templateUrl: './user-i-o.component.html'
})
export class UserIOComponent implements OnInit {

  @Input()
  pokemon: Pokemon;

  @Input()
  moveSelectRequire: boolean;

  @Output()
  selectedMoveEvent = new EventEmitter<SelectedMove>();

  ngOnInit(): void {
  }
}
