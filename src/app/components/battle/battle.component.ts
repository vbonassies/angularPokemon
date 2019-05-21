import {Component, OnInit} from '@angular/core';
import {Battle} from '../../shared/models/battle/battle';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {PokemonType} from '../../shared/models/pokemon/pokemon-types';

@Component({
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  battle: Battle = new Battle(new Pokemon('Charmander', 10, [], PokemonType.Fire), new Pokemon('Pikachu', 10, [], PokemonType.Electric));

    ngOnInit(): void {
      setInterval(() => {
        this.battle.FirstPokemon.isAttacking = !this.battle.FirstPokemon.isAttacking;
        console.log('translating');
      }, 5000);
    }


}
