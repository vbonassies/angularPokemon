import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {attackAnimation} from './pokemon-animations';

@Component({
  selector: 'app-pokemon-renderer',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  animations: [ attackAnimation ]
})
export class PokemonComponent implements OnInit {
  @Input()
  pokemon: Pokemon;
  @Input()
  isFirst: boolean;
  pokemonSprite: string;

  @ViewChild('pokemonRenderer') pokemonRenderer: ElementRef;

  ngOnInit(): void {
      this.pokemonSprite =
          `https://img.pokemondb.net/sprites/black-white/anim/${this.isFirst ? 'back-' : ''}normal/${this.pokemon.Name.toLowerCase()}.gif`;
      this.setPosition();
  }

  private setPosition(): void {
      this.pokemonRenderer.nativeElement.classList.add(this.isFirst ? 'firstPokemon' : 'secondPokemon');
  }

  getPokemonAnimation(): string {
      if (this.pokemon.isAttacking) {
          console.log(`${this.pokemon.Name} is attacking`);
          return 'attacking';
      } else if (this.pokemon.isAttacked) {
          console.log(`${this.pokemon.Name} is attacked`);
          return 'attacked';
      }
      console.log(`${this.pokemon.Name} is sleeping`);
      return 'sleep';
  }
}
