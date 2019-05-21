import {Component, OnInit} from '@angular/core';
import {Battle} from '../../shared/models/battle/battle';
import {Pokemon} from '../../shared/models/pokemon/pokemon';

@Component({
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  battle: Battle = new Battle(new Pokemon('Charmander', 10, []), new Pokemon('Pikachu', 10, []));

    ngOnInit(): void {
    }


}
