import {Component, OnInit} from '@angular/core';
import {Battle} from '../../shared/models/battle/battle';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {PokemonType} from '../../shared/models/pokemon/pokemon-types';
import {ActivatedRoute, Router} from '@angular/router';
import {Pokedex} from '../../shared/models/pokedex/pokedex';
import {PokedexService} from '../../shared/services/pokedex.service';

@Component({
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  battle: Battle;

  constructor(private route: ActivatedRoute, private router: Router, private pokedex: PokedexService) {

  }
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const userPokemon = this.pokedex.getPokemon(params.pokemonName);
        const computerPokemon = this.pokedex.getRandomPokemon(params.pokemonName);
        if (!userPokemon || !computerPokemon) {
            this.router.navigate(['']);
            return;
        }
        this.battle = new Battle(
            userPokemon,
            computerPokemon);
      });
    }
}
