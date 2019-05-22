import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {pokemonAnimation, pokeballAnimation} from './life-animations';

@Component({
  selector: 'app-pokemon-renderer',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.css'],
  animations: [ pokemonAnimation, pokeballAnimation ]
})
export class LifeComponent implements OnInit {
  @Input()
  pokemon: Pokemon;
  @Input()
  isFirst: boolean;
  pokeballVisible: boolean;
  pokemonSprite: string;

  @ViewChild('pokemonRenderer') pokemonRenderer: ElementRef;

  ngOnInit(): void {
      this.pokeballVisible = true;
      this.pokemonSprite =
          `https://img.pokemondb.net/sprites/black-white/anim/${this.isFirst ? 'back-' : ''}normal/${this.pokemon.Name.toLowerCase()}.gif`;
  }

  getPokemonAnimation(): string {
      if (this.pokemon.isAttacking) {
          console.log(`${this.pokemon.Name} is attacking`);
          return this.isFirst ? 'attackingFirst' : 'attackingSecond';
      } else if (this.pokemon.isAttacked) {
          console.log(`${this.pokemon.Name} is attacked`);
          return 'attacked';
      }
      console.log(`${this.pokemon.Name} is sleeping`);
      return this.pokeballVisible ? 'initial' : 'sleep';
  }

  shouldPop(): string {
      if (!this.pokeballVisible) {
          return 'alreadyPop';
      }
      setTimeout( () => {
        this.pokeballVisible = false;
      }, 1250);
      return this.isFirst ? 'pokePopFirst' : 'pokePopSecond';
  }
}
