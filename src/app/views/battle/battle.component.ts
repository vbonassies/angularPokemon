import {Component, OnInit} from '@angular/core';
import {Battle} from '../../shared/models/battle/battle';
import {ActivatedRoute, Router} from '@angular/router';
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
      this.pokedex.isPokedexInitialized().subscribe(res => {
        if (res) {
          const userPokemon = this.pokedex.getPokemon(params.pokemonName);
          const randomLevel = Math.floor(Math.random() * 99);
          const computerPokemon = this.pokedex.getRandomPokemon(randomLevel);
          if (!userPokemon || !computerPokemon) {
            this.router.navigate(['']);
            return;
          }
          this.battle = new Battle(
              userPokemon,
              computerPokemon);
        }
      });
    });
  }
}
