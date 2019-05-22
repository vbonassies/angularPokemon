import {Component, OnInit} from '@angular/core';
import {Battle} from '../../shared/models/battle/battle';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {PokemonType} from '../../shared/models/pokemon/pokemon-types';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  battle: Battle;

  constructor(private route: ActivatedRoute, private pokedex: Pokedex) {

  }
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.
        this.battle = new Battle(
            new Pokemon('Pikachu', 10, [], PokemonType.Electric),
            new Pokemon('Magneton', 10, [], PokemonType.Electric));
      });
    }
}
