import {Component, OnInit} from '@angular/core';
import {Battle} from '../../shared/models/battle/battle';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {PokemonType} from '../../shared/models/pokemon/pokemon-types';
import {ActivatedRoute} from '@angular/router';
import {Pokedex} from '../../shared/models/pokedex/pokedex';
import {PokedexService} from '../../shared/services/pokedex.service';

@Component({
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  battle: Battle;

  constructor(private route: ActivatedRoute, private pokedex: PokedexService) {

  }
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const userPokemon = this.pokedex.getPokemon(params.pokemonName);
        console.log(params.pokemonName);
        if (!userPokemon) {
            return;
        }
        this.battle = new Battle(
            userPokemon,
            new Pokemon('Charmander', 10, [], PokemonType.Electric));
        setInterval(() => {
            this.battle.FirstPokemon.isAttacking = true;
            this.battle.SecondPokemon.isAttacked = true;
            setTimeout(() => {
                this.battle.FirstPokemon.isAttacking = false;
                this.battle.SecondPokemon.isAttacked = false;
            }, 1000);
        }, 2000);
      });
    }
}
