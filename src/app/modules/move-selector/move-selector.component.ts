import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../../shared/models/pokemon/pokemon';

@Component({
  selector: 'app-move-selector',
  templateUrl: './move-selector.component.html',
  styleUrls: ['./move-selector.component.scss']
})
export class MoveSelectorComponent implements OnInit {

  @Input()
  pokemon: Pokemon;

  ngOnInit(): void {

  }
}
