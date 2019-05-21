import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-pokemon-renderer',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  animations: [
    trigger('attackingAnimation', [
      state('sleep', style({
        transform: 'translateX(-100%)',
      })),
      state('attack', style({
        transform: 'translateX(100%)',
      })),
      transition('sleep => attack', animate('500ms ease')),
      transition('attack => sleep', animate('500ms ease')),
    ])
  ]
})
export class PokemonComponent implements OnInit {
  @Input('pokemon')
  pokemon: Pokemon;
  @Input('isFirst')
  isFirst: boolean;
  pokemonSprite: string;

  @ViewChild('pokemon') pokemonRenderer: ElementRef;

  ngOnInit(): void {
      this.pokemonSprite = `https://img.pokemondb.net/sprites/black-white/anim/${this.isFirst ? 'back-' : ''}normal/${this.pokemon.Name.toLowerCase()}.gif`;
      this.setPosition();
  }

  private setPosition(): void {
      this.pokemonRenderer.nativeElement.classList.add(this.isFirst ? 'firstPokemon' : 'secondPokemon');
  }
}
