import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {pokemonAnimation, pokeballAnimation} from './pokemon-animations';
import {SpriteService} from '../../shared/services/sprite.service';

@Component({
  selector: 'app-pokemon-renderer',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  animations: [ pokemonAnimation, pokeballAnimation ]
})
export class PokemonComponent implements OnInit {
  @Input()
  pokemon: Pokemon;
  @Input()
  isFirst: boolean;
  pokeballVisible: boolean;
  pokemonSprite: string;

  @ViewChild('pokemonRenderer') pokemonRenderer: ElementRef;

  constructor(private sprite: SpriteService) {

  }

  ngOnInit(): void {
      this.pokeballVisible = true;
      this.pokemonSprite = this.sprite.getSpriteUri(this.pokemon.Name, this.isFirst);
  }

  getPokemonAnimation(): string {
      if (this.pokemon.isAttacking) {
          return this.isFirst ? 'attackingFirst' : 'attackingSecond';
      } else if (this.pokemon.isAttacked) {
          return 'attacked';
      } else if (this.pokemon.isDie()) {
          return 'isDead';
      }
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
